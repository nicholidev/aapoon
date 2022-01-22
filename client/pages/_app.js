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
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
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
import Settings from '../components/settings';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';
import { SnackbarProvider } from 'notistack';
// ----------------------------------------------------------------------
import { AuthProvider } from '../contexts/FirebaseContext';
import { addJWTInterceptor } from '../utils/Interceptor';
import { useEffect } from 'react';
import 'react-phone-number-input/style.css';
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);
  useEffect(() => {
    if (localStorage.getItem('authToken')) addJWTInterceptor(localStorage.getItem('authToken'));
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <SettingsProvider>
        <CollapseDrawerProvider>
          <ThemeProvider>
            <SnackbarProvider autoHideDuration={3000}>
              <MotionLazyContainer>
                <GlobalStyles />
                <ProgressBar />
                <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
              </MotionLazyContainer>
            </SnackbarProvider>
          </ThemeProvider>
        </CollapseDrawerProvider>
      </SettingsProvider>
    </>
  );
}
