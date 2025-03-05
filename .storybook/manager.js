import { addons } from '@storybook/manager-api';
import theme from './theme';

// Register the theme
addons.setConfig({
  theme: theme,
});
