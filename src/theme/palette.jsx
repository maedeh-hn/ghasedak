import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#E6F7F5',
  light: '#69CEC5',
  main: '#05AD9E',
  dark: '#04796F',
  darker: '#03574F',
};
const SECONDARY = {
  lighter: '#FFF6E9',
  light: '#FEC064',
  main: '#FDA521',
  dark: '#B17417',
  darker: '#4C320A',
};
const INFO = {
  lighter: '#E6F2FF',
  light: '#4EA5FF',
  main: '#027FFF',
  dark: '#0159B2',
  darker: '#01264D',
};
const SUCCESS = {
  lighter: '#E7F8F0',
  light: '#59CD97',
  main: '#12B76A',
  dark: '#0D804A',
  darker: '#053720',
};
const WARNING = {
  lighter: '#FEF4E6',
  light: '#F9B153',
  main: '#F79009',
  dark: '#AD6506',
  darker: '#4A2B03',
};
const ERROR = {
  lighter: '#FDECEB',
  light: '#F57C74',
  main: '#F04438',
  dark: '#A83027',
  darker: '#481411',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  // 500_12: alpha('#919EAB', 0.12),
  500_12: '#F5F8FE',
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: PRIMARY.lighter,
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[700], secondary: GREY[600], disabled: GREY[500] },
    background: {
      paper: '#fff',
      default: '#fff',
      neutral: GREY[200],
      customBgPrimary: GREY[200],
      customBgSecond: GREY[100],
    },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
      customBgPrimary: '#1c1c1c',
      customBgSecond: '#161C24',
    },
    action: { active: GREY[500], ...COMMON.action },
  },
};

export default palette;
