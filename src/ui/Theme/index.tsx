import * as React from 'react';
import {
  useTheme as useReTheme,
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
    background: '#000b31',
    blue: '#1f155e',
    dark: '#000',
    gray: '#393939',
    card: '#ffffff',
    darkText: '#000',
    chart: '#0cd13f',
    default: '#9b9b9b',
    disabled: '#716d6d',
    description: '#393939',
    error: '#c90404',
    lightBackground: '#ffffff',
    lightText: '#ffffff',
    placeholderText: '#716d6d',
    primary: '#593ac1',
    secondary: '#ffc107',
    white: '#fff',
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  spacing: {
    ss: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
    xxl: 70,
    dxl: 110,
  },
  margin: {
    ss: 5,
    s: 10,
    m: 40,
    l: 75,
    xl: 400,
    dxl: 500,
  },
  breakpoints: {},
};

const theme = createTheme({
  ...BaseTheme,
  textVariants: {
    emptyHeader: {
      color: 'darkText',
      fontWeight: 'bold',
      fontSize: 25,
    },
    headerTitle: {
      color: 'darkText',
      fontWeight: 'bold',
      fontSize: 30,
    },
    errorDescription: {
      color: 'error',
      fontSize: 27,
      textAlign: 'center',
    },
    scanErrorHeader: {
      color: 'error',
      fontSize: 30,
      textAlign: 'center',
    },
    scanWarningHeader: {
      color: 'secondary',
      fontSize: 30,
      textAlign: 'center',
    },
    scanDescription: {
      color: 'darkText',
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'justify',
    },
    scanErrorDescription: {
      color: 'darkText',
      fontSize: 17,
      lineHeight: 22,
      textAlign: 'justify',
      fontWeight: 'bold',
    },
    scanWarningDescription: {
      color: 'darkText',
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'justify',
    },
    scanHeader: {
      color: 'darkText',
      fontSize: 30,
      textAlign: 'center',
    },
    button_disabled: {
      color: 'lightText',
    },
    button_edit: {
      color: 'white',
    },
    button_primary: {
      color: 'lightText',
    },
    button_secondary: {
      color: 'lightText',
      fontSize: 15,
      textTransform: 'uppercase',
    },
    checkBox: {
      color: 'description',
      fontSize: 12,
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
    headerUsername: {
      color: 'darkText',
      fontSize: 19,
    },
    body: {
      color: 'darkText',
      fontSize: 16,
      lineHeight: 24,
    },
    description: {
      color: 'description',
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'justify',
    },
    tip: {
      color: 'description',
      fontSize: 18,
      lineHeight: 23,
      //textAlign: 'justify',
    },
    placeholderText: {
      color: 'placeholderText',
    },
    listItemPrimary: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'darkText',
    },
    listItemData: {
      fontSize: 13,
      color: 'darkText',
    },
    formLabel: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    version: {
      fontSize: 13,
      color: 'description',
    },
  },
  viewVariants: {},
  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
    },
    secondary: {
      backgroundColor: 'secondary',
    },
    edit: {
      backgroundColor: 'secondary',
    },
    disabled: {
      backgroundColor: 'disabled',
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
export const useTheme = () => useReTheme<Theme>();
export const ThemeProvider = ({children}: {children: React.ReactNode}) => (
  <RestyleProvider theme={theme}>{children}</RestyleProvider>
);
