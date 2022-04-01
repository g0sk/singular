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
    lightGray: '#8f8b8b',
    card: '#ffffff',
    darkText: '#000',
    red: '#b9244b',
    lightBlue: '#39b4ed',
    chart: '#0caa36',
    orange: '#df7327',
    default: '#9b9b9b',
    disabled: '#716d6d',
    description: '#393939',
    error: '#c90404',
    lightBackground: '#ffffff',
    lightText: '#ffffff',
    placeholderText: '#716d6d',
    primary: '#593ac1',
    primaryLight: '#a389fa',
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
    sm: 17,
    dm: 19,
    l: 24,
    xl: 40,
    xxl: 70,
    sxl: 110,
    mxl: 120,
    dxxl: 130,
  },
  margin: {
    ss: 5,
    s: 10,
    sm: 28,
    m: 40,
    dm: 55,
    l: 75,
    xl: 400,
    xxl: 450,
    sxl: 500,
    mxl: 600,
    dxxl: 700,
  },
  breakpoints: {},
};

const theme = createTheme({
  ...BaseTheme,
  textVariants: {
    filter: {
      fontSize: 13,
      color: 'lightText',
    },
    segmentLabelDark: {
      color: 'dark',
      fontSize: 15,
    },
    segmentLabelLight: {
      color: 'lightText',
      fontSize: 15,
    },
    emptyHeader: {
      color: 'darkText',
      fontWeight: 'bold',
      fontSize: 25,
    },
    updated: {
      color: 'darkText',
      fontWeight: 'bold',
      fontSize: 18,
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
    scanSuccessHeader: {
      color: 'primary',
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
    scanSuccessId: {
      color: 'primary',
      fontSize: 16,
      lineHeight: 30,
      textAlign: 'justify',
    },
    scanSuccessDescription: {
      color: 'primary',
      fontSize: 16,
      lineHeight: 30,
      textAlign: 'justify',
    },
    scanErrorDescription: {
      color: 'darkText',
      fontSize: 19,
      lineHeight: 30,
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
    scanMode: {
      color: 'darkText',
      fontSize: 19,
      fontWeight: 'bold',
    },
    button_disabled: {
      color: 'lightText',
    },
    button_edit: {
      color: 'white',
      fontSize: 12,
    },
    button_select: {
      color: 'white',
      fontSize: 12,
    },
    button_upload: {
      color: 'lightText',
    },
    button_primary: {
      color: 'lightText',
    },
    button_delete: {
      color: 'lightText',
      fontSize: 15,
    },
    button_create: {
      color: 'lightText',
      fontSize: 15,
    },
    button_secondary: {
      color: 'lightText',
      fontSize: 15,
    },
    button_write: {
      color: 'lightText',
      fontSize: 12,
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
      fontSize: 19,
      fontWeight: 'bold',
    },
    dataLabel: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    version: {
      fontSize: 13,
      color: 'description',
    },
  },
  buttonVariants: {
    primary: {
      backgroundColor: 'primary',
    },
    secondary: {
      backgroundColor: 'secondary',
    },
    edit: {
      backgroundColor: 'secondary',
      width: 70,
      height: 28,
      paddingHorizontal: 's',
      paddingVertical: 'ss',
      borderRadius: 10,
      alignItems: 'center',
    },
    upload: {
      backgroundColor: 'primary',
      width: 300,
      height: 35,
      borderRadius: 10,
      alignItems: 'center',
    },
    select: {
      backgroundColor: 'primary',
      width: 59,
      height: 28,
      paddingHorizontal: 's',
      paddingVertical: 'ss',
      borderRadius: 10,
      alignItems: 'center',
    },
    disabled: {
      backgroundColor: 'disabled',
    },
    delete: {
      backgroundColor: 'error',
    },
    create: {
      backgroundColor: 'secondary',
    },
    write: {
      backgroundColor: 'darkText',
      width: 90,
      heigth: 60,
      paddingVertical: 's',
      alignItems: 'center',
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
