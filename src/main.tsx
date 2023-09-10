import React from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore
import App from './App'
import {Provider as ReduxProvider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";

// highlight
import './utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

import {HelmetProvider} from 'react-helmet-async';
// @ts-ignore
import {PersistGate} from 'redux-persist/lib/integration/react';
// redux
// @ts-ignore
import {store, persistor} from './redux/store';
// contexts
// @ts-ignore
import {SettingsProvider} from './contexts/SettingsContext';
// @ts-ignore
import {CollapseDrawerProvider} from './contexts/CollapseDrawerContext';

// @ts-ignore
import {AuthProvider} from './contexts/JWTContext.jsx';


const queryClient = new QueryClient({
    defaultOptions: {
        // @ts-ignore
        cacheTime: 0,
        queries: {
            retry: 2,
            retryDelay: 3,
            refetchIntervalInBackground: false
        },
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <AuthProvider>
          <HelmetProvider>
              <ReduxProvider store={store}>
                  <PersistGate loading={null} persistor={persistor}>
                      <SettingsProvider>
                          <CollapseDrawerProvider>
                              <QueryClientProvider client={queryClient}>
                                  <BrowserRouter>
                                      <App/>
                                  </BrowserRouter>
                              </QueryClientProvider>
                          </CollapseDrawerProvider>
                      </SettingsProvider>
                  </PersistGate>
              </ReduxProvider>
          </HelmetProvider>
      </AuthProvider>
  </React.StrictMode>,
)
