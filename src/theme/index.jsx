import PropTypes from 'prop-types';
import {useMemo} from 'react';
// @mui
import {CssBaseline} from '@mui/material';
import {createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider} from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import shadows, {customShadows} from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({children}) {
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
    const {themeMode, themeDirection, themeFontSize, themeBorderRadius} = useSettings();
    const isLight = themeMode === 'light';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    const themeOptions = useMemo(
        () => ({
            palette: isLight ? palette.light : palette.dark,
            typography,
            breakpoints,
            shape: {borderRadius: 10},
            direction: themeDirection,
            shadows: isLight ? shadows.light : shadows.dark,
            customShadows: isLight ? customShadows.light : customShadows.dark,
            fontSize: isMobile ? themeFontSize - 3 : themeFontSize,
            borderRadius: themeBorderRadius,
            backgroundColor: '#F9F9F9',
            zIndex: {
                appBar: 900,
                drawer: 1000,
                mobileStepper: 800,
                modal: 1100,
                snackbar: 1200,
                speedDial: 850,
                tooltip: 1300,
            }
        }),
        [isLight, themeDirection, themeFontSize, themeBorderRadius]
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
