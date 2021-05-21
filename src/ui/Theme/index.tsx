import * as React from 'react';
import {
  ThemeProvider as RestyleProvider,
  TextProps,
  BoxProps,
} from '@shopify/restyle';

type ThemeType = typeof BaseTheme & {
  textVariants: {[key: string]: TextProps<typeof BaseTheme>};
  buttonVariants: {[key: string]: BoxProps<typeof BaseTheme>};
};

const createTheme = <T extends ThemeType>(themeObject: T): T => themeObject;

const BaseTheme = {
  colors: {
    primary: '#1f155e',
    secondary: '#ffc107',
    purpleLight: '#593ac1',
    lightBackground: '#fff',
    card: '#fff',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {},
};

export const theme = createTheme({
  ...BaseTheme,
  textVariants: {
    header: {
      color: '#000000',
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
    },
    secondary: {
      backgroundColor: 'secondary',
    },
  },
  navigation: {
    dark: false,
    colors: {
      primary: BaseTheme.colors.primary,
      background: BaseTheme.colors.lightBackground,
      card: BaseTheme.colors.card,
      text: BaseTheme.colors.primary,
      notification: 'grey',
      border: 'grey',
    },
  },
});

export type Theme = typeof theme;
export const ThemeProvider = ({children}: {children: React.ReactNode}) => (
  <RestyleProvider theme={theme}>{children}</RestyleProvider>
);
