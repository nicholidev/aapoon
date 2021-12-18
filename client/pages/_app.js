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
import 'react-phone-number-input/style.css';
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SettingsProvider>
        <CollapseDrawerProvider>
          <ThemeProvider>
            <SnackbarProvider>
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
