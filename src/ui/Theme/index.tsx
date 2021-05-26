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
    primary: '#593ac1',
    secondary: '#ffc107',
    blue: '#1f155e',
    lightBackground: '#ffffff',
    background: '#000b31',
    card: '#ffffff',
    lightText: '#ffffff',
    darkText: '#000',
    default: '#9b9b9b',
    placeholderText: '#716d6d',
    white: '#fff',
    error: '#c90404',
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  margin: {
    s: 10,
    m: 40,
    l: 75,
    xl: 400,
  },
  breakpoints: {},
};

export const theme = createTheme({
  ...BaseTheme,
  textVariants: {
    button_primary: {
      color: 'lightText',
    },
    button_secondary: {
      color: 'lightText',
      fontSize: 20,
      textTransform: 'uppercase',
    },
    header1: {
      color: 'darkText',
      fontWeight: 'bold',
      fontSize: 28,
    },
    header2: {
      color: 'darkText',
      fontSize: 24,
    },
    body: {
      color: 'darkText',
      fontSize: 16,
      lineHeight: 24,
    },
    placeholderText: {
      color: 'placeholderText',
    },
  },
  boxVariants: {},
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
      notification: BaseTheme.colors.default,
      border: BaseTheme.colors.default,
    },
  },
});

export type Theme = typeof theme;
export const ThemeProvider = ({children}: {children: React.ReactNode}) => (
  <RestyleProvider theme={theme}>{children}</RestyleProvider>
);
