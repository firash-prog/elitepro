import { createTheme } from '@radix-ui/react-themes';

export const theme = createTheme({
  colors: {
    primary: '#75cdd6',
    secondary: '#0c1c34',
    accent: '#75cdd6',
    background: '#183969',
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
