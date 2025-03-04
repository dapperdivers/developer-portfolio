
/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "docs": {
    "autodocs": true
  },
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  "previewMainFile": "./preview.jsx"
};
export default config;
