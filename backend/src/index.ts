import * as pulumi from "@pulumi/pulumi";
import * as k8s from "@pulumi/kubernetes";

// Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
// running on minikube, and if so, create only services of type ClusterIP.
const config = new pulumi.Config();
const isMinikube = config.requireBoolean("isMinikube");

const smallResourses = { requests: { cpu: "100m", memory: "100Mi" } };

const appName = "redis-leader";
const redisLeaderLabels = { app: appName };
const redisLeaderDeployment = new k8s.apps.v1.Deployment(appName, {
  spec: {
    selector: { matchLabels: redisLeaderLabels },
    replicas: 1,
    template: {
      metadata: { labels: redisLeaderLabels },
      spec: {
        containers: [
          {
            name: appName,
            image: "redis",
            resources: smallResourses,
            ports: [{ containerPort: 6379 }],
          },
        ],
      },
    },
  },
});

new k8s.core.v1.Service(appName, {
  metadata: {
    name: appName,
    labels: redisLeaderDeployment.metadata.labels,
  },
  spec: {
    ports: [{ port: 6379, targetPort: 6379 }],
    selector: redisLeaderDeployment.spec.template.metadata.labels,
  },
});

//
// REDIS REPLICA.
//

const redisReplicaLabels = { app: "redis-replica" };
const redisReplicaDeployment = new k8s.apps.v1.Deployment("redis-replica", {
  spec: {
    selector: { matchLabels: redisReplicaLabels },
    template: {
      metadata: { labels: redisReplicaLabels },
      spec: {
        containers: [
          {
            name: "replica",
            image: "pulumi/guestbook-redis-replica",
            resources: { requests: { cpu: "100m", memory: "100Mi" } },
            // If your cluster config does not include a dns service, then to instead access an environment
            // variable to find the leader's host, change `value: "dns"` to read `value: "env"`.
            env: [{ name: "GET_HOSTS_FROM", value: "dns" }],
            ports: [{ containerPort: 6379 }],
          },
        ],
      },
    },
  },
});
new k8s.core.v1.Service("redis-replica", {
  metadata: {
    name: "redis-replica",
    labels: redisReplicaDeployment.metadata.labels,
  },
  spec: {
    ports: [{ port: 6379, targetPort: 6379 }],
    selector: redisReplicaDeployment.spec.template.metadata.labels,
  },
});

const frontendName = "frontend";
const frontendLabels = { app: frontendName };
const frontendDeployment = new k8s.apps.v1.Deployment(frontendName, {
  spec: {
    selector: { matchLabels: frontendLabels },
    replicas: 5,
    template: {
      metadata: { labels: frontendLabels },
      spec: {
        containers: [
          {
            name: frontendName,
            image: "pulumi/guestbook-php-redis",
            resources: smallResourses,
            env: [{ name: "GET_HOSTS_FROM", value: "dns" }],
            ports: [{ containerPort: 80 }],
          },
        ],
      },
    },
  },
});
const frontendService = new k8s.core.v1.Service(frontendName, {
  metadata: { labels: frontendDeployment.spec.template.metadata.labels },
  spec: {
    type: isMinikube ? "ClusterIP" : "LoadBalancer",
    ports: [{ port: 80, targetPort: 80, protocol: "TCP" }],
    selector: frontendLabels,
  },
});

// When "done", this will print the public IP.
export const ip = isMinikube
  ? frontendService.spec.clusterIP
  : frontendService.status.loadBalancer.apply(
      (lb) => lb.ingress[0].ip || lb.ingress[0].hostname
    );
