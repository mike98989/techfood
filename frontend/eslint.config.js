import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      // Turn off the rule that requires React in scope when using JSX
      'react/react-in-jsx-scope': 'off',
      "react/jsx-uses-react": "off",
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];