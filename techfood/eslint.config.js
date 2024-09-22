import globals from "globals";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["resources/js/**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    ignores: ["vendor/*"], // Exclude vendor and third-party directories from linting
  },
  { languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
];

