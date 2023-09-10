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

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
// redux
import {store, persistor} from './redux/store';
// contexts
import {SettingsProvider} from './contexts/SettingsContext.jsx';
import {CollapseDrawerProvider} from './contexts/CollapseDrawerContext.jsx';

import {AuthProvider} from './contexts/JWTContext.ts';

//
import App from './App';
import {ient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        cacheTime: 0,
        queries: {
            retry: 2,
            retryDelay: 3,
            refetchIntervalInBackground: false
        },
    },
});
// ----------------------------------------------------------------------

ReactDOM.render(
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
    </AuthProvider>,
    document.getElementById('root')
);
