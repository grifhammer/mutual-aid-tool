import { Project, web } from "projen";
import { TurborepoProject } from "projen-turborepo";
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
  description: "A tool for tracking mutual aid",
  deps: [] /* Runtime dependencies of this module. */,
});
new web.NextJsTypeScriptProject({
  defaultReleaseBranch: "main",
  name: "Frontend",
  outdir: "web",
  parent: project,
});

new Project({
  parent: project,
  name: "Backend",
  outdir: "backend",
});

project.synth();
