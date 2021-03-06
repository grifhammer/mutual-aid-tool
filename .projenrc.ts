import { web } from "projen";
import { TurborepoProject } from "projen-turborepo";
import { TypeScriptProject } from "projen/lib/typescript";
const project = new TurborepoProject({
  defaultReleaseBranch: "main",
  devDeps: ["projen-turborepo"],
  name: "mutual-aid-tracker",
  projenrcTs: true,
  projectReferences: true,
  vscodeMultiRootWorkspaces: true,
  parallelWorkflows: true,
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
new web.NextJsTypeScriptProject({
  defaultReleaseBranch: "main",
  name: "Frontend",
  outdir: "web",
  parent: project,
  deps: [],
  eslintOptions: {
    prettier: true,
    dirs: [],
  },
});

new TypeScriptProject({
  parent: project,
  name: "Backend",
  outdir: "backend",
  defaultReleaseBranch: "main",
  deps: ["@pulumi/kubernetes", "@pulumi/kubernetesx"],
  eslintOptions: {
    prettier: true,
    dirs: [],
  },
});

project.synth();
