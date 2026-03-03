import { createTheme } from '@radix-ui/react-themes';

export const theme = createTheme({
  colors: {
    primary: '#FFFFFF',
    secondary: '#1a4b63',
    accent: '#FFFFFF',
    background: '#051622',
  },
  fonts: {
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
  }
});

// Configuration for TailwindCSS
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
      },
      fontFamily: {
        body: theme.fonts.body,
        heading: theme.fonts.heading,
      },
    },
  },
};
