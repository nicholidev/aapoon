/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// scroll bar
import 'simplebar/src/simplebar.css';

// editor
import 'react-quill/dist/quill.snow.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
import PropTypes from 'prop-types';
// next
import Head from 'next/head';

// @mui
import { NoSsr } from '@mui/material';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
import GlobalStyles from '../theme/globalStyles';
// components

import ProgressBar from '../components/ProgressBar';
import Box from '@mui/material/Box';

import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import { SnackbarProvider } from 'notistack';
// ----------------------------------------------------------------------
import { AuthProvider } from '../contexts/FirebaseContext';
import { addJWTInterceptor } from '../utils/Interceptor';
import ScreenRotationIcon from '@mui/icons-material/ScreenRotation';
import { useEffect, useState } from 'react';
import { isJwtExpired } from 'jwt-check-expiration';
import LoadingScreen from '../components/LoadingScreen';
import ModalSub from '../components/SubscriiptionModal';

import 'firebase/firestore';
import 'firebase/auth';
import { FuegoProvider } from '@nandorojo/swr-firestore';
import { Fuego } from '../Fuego';
import { FIREBASE_API } from '../config';
import createEmotionCache from '../src/createEmotionCache';
import { CacheProvider } from '@emotion/react';

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};
const fuego = new Fuego(FIREBASE_API);
const clientSideEmotionCache = createEmotionCache();
export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const [isLandscape, setLandScape] = useState(false);
  const [loading, setLoading] = useState(true);
  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    window.addEventListener('orientationchange', (event) => {
      if (event.target.screen.orientation.angle == 90 || event.target.screen.orientation.angle == 270) {
        setLandScape(true);
      } else {
        setLandScape(false);
      }
    });

    if (localStorage.getItem('authToken') && !isJwtExpired(localStorage.getItem('authToken'))) {
      addJWTInterceptor(localStorage.getItem('authToken'));
    }

    window.onload = function () {
      // can also use window.addEventListener('load', (event) => {
      setLoading(false);

      // image is loaded at this time
    };
    // if (localStorage.getItem('authToken')) ;
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <SettingsProvider>
        <CollapseDrawerProvider>
          <ThemeProvider>
            <FuegoProvider fuego={fuego}>
              <SnackbarProvider autoHideDuration={3000}>
                <MotionLazyContainer>
                  <GlobalStyles />
                  <ProgressBar />

                  {!isLandscape ? (
                    <AuthProvider>
                      <LoadingScreen load={loading}>
                        <ModalSub />

                        {!loading && getLayout(<Component {...pageProps} />)}
                      </LoadingScreen>
                    </AuthProvider>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: '#E25630',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                      style={{ height: '100vh', width: '100vw' }}
                    >
                      <ScreenRotationIcon style={{ fontSize: 150, color: '#fff' }} />
                      <br />
                      <br />
                      <h3 style={{ color: '#fff', textAlign: 'center' }}>
                        Landscape mode is not supported
                        <br />
                        please rotate to portrait mode
                      </h3>
                    </Box>
                  )}
                </MotionLazyContainer>
              </SnackbarProvider>
            </FuegoProvider>
          </ThemeProvider>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </CacheProvider>
  );
}
