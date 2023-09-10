import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import logoImg from '../assets/logo/logo.png'
import grayLogoImg from '../assets/logo/logogray.png'


// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx, gray=false }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;


  const LogoImgC = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={gray ? grayLogoImg : logoImg}  alt={'logo'}/>
    </Box>
  );

  if (disabledLink) {
    return <>{LogoImgC}</>;
  }

  return <RouterLink to="/">{LogoImgC}</RouterLink>;
}
