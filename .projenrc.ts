import { TextFile, web, YamlFile } from "projen";
import { TurborepoProject } from "projen-turborepo";
import { TypeScriptProject } from "projen/lib/typescript";
import { addTailwind } from "./tailwind";

const project = new TurborepoProject({
  defaultReleaseBranch: "main",
  devDeps: ["projen-turborepo"],
  name: "mutual-aid-tracker",
  projenrcTs: true,
  projectReferences: true,
  vscodeMultiRootWorkspaces: true,
  parallelWorkflows: true,
  gitignore: ["backend/src/config/index.ts"],
  eslintOptions: {
    prettier: true,
    dirs: [],
  },
  tsconfig: {
    compilerOptions: {
      forceConsistentCasingInFileNames: true,
    },
  },
  release: false,
  description: "A tool for tracking mutual aid",
  deps: [] /* Runtime dependencies of this module. */,
});

const nextJs = new web.NextJsTypeScriptProject({
  srcdir: "src",
  defaultReleaseBranch: "main",
  name: "Frontend",
  outdir: "web",
  parent: project,
  deps: [
    "axios",
    "@fortawesome/fontawesome-svg-core",
    "@fortawesome/free-solid-svg-icons",
    "@fortawesome/react-fontawesome",
    "@nextui-org/react",
  ],
  eslintOptions: {
    prettier: true,
    dirs: [],
  },
  tsconfig: {
    compilerOptions: {
      rootDir: "src",
      strict: true,
    },
  },
  tsconfigDev: {
    compilerOptions: {
      strict: true,
    },
  },
});
addTailwind(nextJs);

const backendProject = new TypeScriptProject({
  parent: project,
  name: "Backend",
  outdir: "backend",
  defaultReleaseBranch: "main",
  deps: ["@hapi/hapi", "@hapi/cookie", "hapi-mongodb", "mongoose"],
  devDeps: ["@types/hapi__hapi", "ts-node"],
  gitignore: ["/src/config/index.ts"],
  eslintOptions: {
    prettier: true,
    dirs: [],
  },
});

new TypeScriptProject({
  parent: project,
  name: "Infra",
  outdir: "infra",
  defaultReleaseBranch: "main",
  deps: ["@pulumi/kubernetes", "@pulumi/kubernetesx"],
  eslintOptions: {
    prettier: true,
    dirs: [],
  },
});
new YamlFile(project, ".docker/docker-compose.yaml", {
  obj: {
    version: "3.7",
    services: {
      backend: {
        build: {
          context: "backend",
          target: "development",
        },
        depends_on: ["db"],
        container_name: "hapijs",
      },
      db: {
        image: "mongo",
        restart: "always",
        environment: {},
        expose: [27017],
        container_name: "mongo-database",
      },
      frontend: {
        build: {
          context: "web",
          target: "development",
        },
        depends_on: ["backend"],
        expose: [3000],
        container_name: "nextjs",
      },
    },
  },
});

new TextFile(backendProject, "Dockerfile", {
  lines: [
    "FROM node AS development",
    "COPY . /src",
    "RUN cd /src; npm install; npm i -g ts-node",
    'CMD ["ts-node", "/src/src/index.ts"]',
  ],
});

new TextFile(nextJs, "Dockerfile", {
  lines: [
    "FROM node AS development",
    "COPY . ./",
    "RUN yarn install",
    'CMD ["npm", "run", "dev"]',
  ],
});

project.synth();
