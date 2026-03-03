import { createTheme } from '@radix-ui/react-themes';

export const theme = createTheme({
  colors: {
    primary: '#5f27cd',
    secondary: '#0abde3',
    accent: '#ff6b81',
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Georgia, serif',
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
