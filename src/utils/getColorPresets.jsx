// theme
import palette from '../theme/palette';

// ----------------------------------------------------------------------

export const colorPresets = [
  // DEFAULT
  {
    name: 'default',
    ...palette.light.primary,
  },
  // PURPLE
  {
    name: 'purple',
    lighter: '#f8edff',
    light: '#B985F4',
    main: '#a617ff',
    dark: '#801dbd',
    darker: '#200A69',
    contrastText: '#fff',
  },
  // CYAN
  {
    name: 'cyan',
    lighter: '#f1f1f1',
    light: '#767676',
    main: '#48494b',
    dark: '#393a3c',
    darker: '#393b3e',
    contrastText: '#fff',
  },
  // BLUE
  {
    name: 'blue',
    lighter: '#dde9c4',
    light: '#779350',
    main: '#576a3d',
    dark: '#4a5836',
    darker: '#3a442b',
    contrastText: '#fff',
  },
  // ORANGE
  {
    name: 'orange',
    lighter: '#f5f3f0',
    light: '#b98750',
    main: '#846645',
    dark: '#745b3e',
    darker: '#645038',
    contrastText: '#fff',
  },
  // RED
  {
    name: 'red',
    lighter: '#ebeff2',
    light: '#184f90',
    main: '#00375c',
    dark: '#022942',
    darker: '#011b2c',
    contrastText: '#fff',
  },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];

export default function getColorPresets(presetsKey) {
  return {
    purple: purplePreset,
    cyan: cyanPreset,
    blue: bluePreset,
    orange: orangePreset,
    red: redPreset,
    default: defaultPreset,
  }[presetsKey];
}
