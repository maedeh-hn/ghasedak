import PropTypes from 'prop-types';
import {m} from 'framer-motion';
// @mui
import {alpha, styled} from '@mui/material/styles';
import {Box, CircularProgress, LinearProgress} from '@mui/material';
//
import Page from "./Page";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({theme}) => ({
  position: 'relative',
  top: '50%',
  width: '50%',
  margin: '0 auto',
}));

// ----------------------------------------------------------------------

LoadingScreen.propTypes = {
  isDashboard: PropTypes.bool,
};

export default function LoadingScreen({isDashboard, ...other}) {
  return (
      <Page title={'بارگیری صفحه'}>
        {isDashboard ? (
            <RootStyle {...other}>
              <LinearProgress color="primary"/>
            </RootStyle>
        ) : <></>}
      </Page>
  );
}
