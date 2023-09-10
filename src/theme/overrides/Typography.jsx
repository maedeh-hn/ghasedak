// ----------------------------------------------------------------------

export default function Typography(theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        root: {
          fontSize: `${theme.fontSize}px`,
          // '-moz-font-feature-settings': "'ss02'",
          // '-webkit-font-feature-settings': "'ss02'",
          // 'font-feature-settings': "'ss02'",
        }
      },
    },
  };
}
