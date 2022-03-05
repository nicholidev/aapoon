/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useState } from 'react';
import { Link as RouterLink } from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes

// components
import Page from '../../components/Page';
// sections
import { ForgotPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';
import withoutAuth from '../../HOC/withOutAuth';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
            {!sent ? (
              <>
                <Typography variant="h3" align="center" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }} align="center">
                  Please enter the email address associated with your account and We will email you a link to reset your
                  password.
                </Typography>

                <ForgotPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                <Button fullWidth size="large" onClick={() => router.back()} sx={{ mt: 1 }}>
                  Back
                </Button>
              </>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                <Typography variant="h3" gutterBottom>
                  Request sent successfully
                </Typography>
                <Typography>
                  We have sent a confirmation email to &nbsp;
                  <strong>{email}</strong>
                  <br />
                  Please check your email.
                </Typography>

                <Button size="large" variant="contained" onClick={() => router.back()} sx={{ mt: 5 }}>
                  Back
                </Button>
              </Box>
            )}
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default withoutAuth(ForgotPassword);
