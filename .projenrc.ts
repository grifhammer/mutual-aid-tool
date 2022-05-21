import { web } from "projen";
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
