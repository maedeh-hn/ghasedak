// @mui
import { alpha, styled } from '@mui/material/styles';
// hooks
import useSettings from '../../hooks/useSettings';

import * as React from 'react';
import Slider from '@mui/material/Slider';

// ----------------------------------------------------------------------

export default function SettingFontSize() {
  const { themeFontSize, onChangeFontSize } = useSettings();

  const CustomSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    '& .MuiSlider-thumb': {
      '&:hover, &.Mui-focusVisible': {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
      },
      '&.Mui-active': {
        boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
      },
    },
  }));

  return (
    <CustomSlider
      defaultValue={themeFontSize}
      valueLabelDisplay="auto"
      onChange={(event, value) => onChangeFontSize(value)}
      min={10}
      max={30}
    />
  );
}
