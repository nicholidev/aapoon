import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography, TextField, Link } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes

// components
import Page from '../../components/Page';
import { VerifyCodeForm } from '../../sections/auth/verify-code';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';
import useAuth from '../../hooks/useAuth';
import Iconify from './../../components/Iconify';
import { IconButtonAnimate } from './../../components/animate';
// ----------------------------------------------------------------------
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sendMobile, setSendMobile] = useState(false);
  const { user, resendEmailVerification, sendMobileVerificationCode, verifyMobileLinkCode } = useAuth();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onResend = () => {
    setIsLoading(true);
    resendEmailVerification().then((res) => {
      setSent(true);
      setIsLoading(false);
      enqueueSnackbar('Account verification link sent successfully', {
        variant: 'success',
        action: (key) => (
          <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
            <Iconify icon={'eva:close-fill'} />
          </IconButtonAnimate>
        ),
      });
    });
  };

  const sendMobileVerification = () => {
    setIsLoading(true);
    sendMobileVerificationCode()
      .then((response) => {
        setSendMobile(true);
        setIsLoading(false);
        enqueueSnackbar('Mobile verification code sent successfully', {
          variant: 'success',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: 'error',
          action: (key) => (
            <IconButtonAnimate size="small" onClick={() => closeSnackbar(key)}>
              <Iconify icon={'eva:close-fill'} />
            </IconButtonAnimate>
          ),
        });
      });
  };

  useEffect(() => {
    setTimeout(() => sendMobileVerification(), 1000);
  }, []);

  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />
        <div id="captcha-container"></div>
        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {true ? (
              <>
                {false ? (
                  <>
                    <Typography variant="h3" align="center" paragraph>
                      Verify your Phone number
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 5 }} align="center">
                      Please verify your phone we will sent a verification code to your mobile.
                    </Typography>

                    <TextField fullWidth value={user.phoneNumber} readOnly />

                    <LoadingButton
                      fullWidth
                      loading={isLoading}
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to={'/'}
                      sx={{ mt: 4 }}
                      onClick={() => sendMobileVerification()}
                    >
                      Send code
                    </LoadingButton>
                  </>
                ) : (
                  <>
                    <Typography variant="h3" paragraph>
                      Please check your phone!
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      We have sent a 6-digit confirmation code to your mobile, please enter the code in below box to
                      verify your mobile.
                    </Typography>

                    <Box sx={{ mt: 5, mb: 3 }}>
                      <VerifyCodeForm verifyMobileLinkCode={verifyMobileLinkCode} />
                    </Box>

                    <Typography variant="body2" align="center">
                      Don’t have a code? &nbsp;
                      <Link variant="subtitle2" underline="none" onClick={() => sendMobileVerification()}>
                        Resend code
                      </Link>
                    </Typography>
                  </>
                )}
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Verify your email
                </Typography>
                <Typography>
                  We have sent a verification email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <LoadingButton
                  onClick={onResend}
                  loading={isLoading}
                  disabled={sent}
                  size="large"
                  variant="contained"
                  component={RouterLink}
                  to={'/'}
                  sx={{ mt: 5 }}
                >
                  Resend verification email
                </LoadingButton>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
