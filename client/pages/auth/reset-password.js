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
// assets
import { SentIcon } from '../../assets';
import withoutAuth from '../../HOC/withOutAuth';
import { useRouter } from 'next/router';
import ResetPasswordForm from '../../sections/auth/reset-password/ResetPasswordForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const OuterDiv = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '22px 15px',
}));

const Main = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  maxWidth: 480,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 30px 30px',
  borderRadius: '20px',
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const router = useRouter();
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container maxWidth="sm">
          <OuterDiv>
            <Main>
              <Typography variant="h3" align="center" paragraph>
                Reset Password
              </Typography>
              <ResetPasswordForm />
            </Main>
          </OuterDiv>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default withoutAuth(ResetPassword);
