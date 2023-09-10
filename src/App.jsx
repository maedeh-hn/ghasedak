// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import ThemeColorPresets from './components/ThemeColorPresets';
import ThemeLocalization from './components/ThemeLocalization';
import MotionLazyContainer from './components/animate/MotionLazyContainer';
// import { setupAxios } from './utils/axios';

// ----------------------------------------------------------------------
import axios from './utils/axios';
import { store } from './redux/store';
import useAuth from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getLines } from './redux/slices/line';
import { useEffect } from 'react';

import * as signalR from '@microsoft/signalr';

export default function App() {
  const { logout, isAuthenticated } = useAuth();
  // setupAxios(axios, store, logout);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getLines());
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <ChartStyle />
                <Settings />
                <ScrollToTop />
                <Router />
              </MotionLazyContainer>
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
