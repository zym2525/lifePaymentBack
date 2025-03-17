export interface ThemeColorItem {
  primary: string;
}

export type ThemeColorName = 'default' | 'green' | 'orange' | 'red' | 'brown' | 'black';

export type ThemeColorsType = Record<ThemeColorName, ThemeColorItem>;

export const ThemeColors = {
  default: {
    primary: '#2878ff',
  },
  green: {
    primary: '#32B16C',
  },
  orange: {
    primary: '#FF7C02',
  },
  red: {
    primary: '#FF1E2F',
  },
  brown: {
    primary: '#81511C',
  },
  black: {
    primary: '#052B3A',
  },
};
