import { TextFile } from "projen";
import { NextJsTypeScriptProject } from "projen/lib/web";

export function addTailwind(nextJs: NextJsTypeScriptProject) {
  const postCss = nextJs.tryFindObjectFile("postcss.config.json");
  postCss?.addOverride("plugins.tailwindcss.config", "./tailwind.config.js");

  const tailwindConfig = nextJs.tryFindFile("tailwind.config.js");
  if (!tailwindConfig) {
    new TextFile(nextJs, "tailwind.config.js", {
      readonly: false,
      lines: [
        "module.exports = {",
        '  content: ["./src/pages/**/*.{html,js,jsx,ts,tsx}"],',
        "};",
      ],
    });
  }

  return tailwindConfig;
}
