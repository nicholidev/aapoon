/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// @mui
import { Stack, Button, Divider, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function AuthFirebaseSocials() {
  const { loginWithGoogle, loginWithFaceBook, loginWithTwitter } = useAuth();

  const handleLoginGoogle = async () => {
    try {
      let data = await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFaceBook = async () => {
    try {
      await loginWithFaceBook();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginTwitter = async () => {
    try {
      await loginWithTwitter();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginGoogle}>
          <Iconify icon={'eva:google-fill'} color="#DF3E30" width={24} height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginFaceBook}>
          <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={24} height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={handleLoginTwitter}>
          <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={24} height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
