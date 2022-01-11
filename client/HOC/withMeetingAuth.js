/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRouter } from 'next/router';
import { addJWTInterceptor, errorHandlerInterceptor } from '../utils/Interceptor';
import { styled } from '@mui/material/styles';
import { Typography, Box, Dialog, Divider } from '@mui/material';
import RegisterForm from '../sections/auth/meeting/RegisterForm';
import VerifyCode from '../sections/auth/meeting/verifyCode';
import PasswordForm from '../sections/auth/meeting/PasswordForm';
import Logo from '../components/Logo';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMeetingDetails } from '../api/meeting';
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: '0px 32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(8, 0),
}));

const withMeetingAuth = (WrappedComponent) => {
  // const { userData, login, logoutUser } = useAuth();

  return (props) => {
    errorHandlerInterceptor();
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      let { query } = useRouter();
      const router = useRouter();
      const [open, setOpen] = useState(true);
      const [isOtp, setOtp] = useState(false);
      const [mobile, setMobile] = useState('');
      const [error, setError] = useState('');
      const [meetData, setMeetData] = useState({});
      const [loading, setLoading] = useState(true);
      const [authMeeting, setAuthMeeting] = useState({
        isAuth: localStorage.getItem('mid') == query.meetingid,
        id: localStorage.getItem('mid'),
        jwt: '',
      });

      useEffect(() => {
        if (query.meetingid)
          getMeetingDetails(query.meetingid)
            .then((data) => {
              setLoading(false);

              if (!data || !data?.uid) {
                setError('invalid-meeting');
              }
              setMeetData(data);
            })
            .catch((err) => {
              setLoading(false);
              setError('server-error');
            });

        if (localStorage.getItem('isAuthenticated') && !meetData.password) {
          setAuthMeeting({
            isAuth: true,
            id: query.meetingid,
            jwt: '',
          });
        } else {
          setAuthMeeting({
            isAuth: localStorage.getItem('mid') == query.meetingid,
            id: localStorage.getItem('mid'),
            jwt: '',
          });
        }
      }, [query?.meetingid]);

      console.log(meetData);
      console.log(authMeeting);
      if (authMeeting.isAuth == true) return <WrappedComponent {...props} />;
      if (error == 'invalid-meeting') {
        // router.replace('/');

        return (
          <div>
            <Dialog
              open={open}
              maxWidth={'sm'}
              fullWidth
              fullScreen
              // onClose={() => setOpen(false)}
              id={'registerPopover'}
              key={'registerPopover'}
            >
              <ContentStyle>
                <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <center>
                      <ErrorOutlineIcon sx={{ fontSize: 80 }} />
                    </center>
                    <Typography variant="h4" align="center" gutterBottom>
                      Invalid meeting
                    </Typography>
                  </Box>
                </Box>
              </ContentStyle>
            </Dialog>
          </div>
        );
      }

      if (!localStorage.getItem('isAuthenticated') && !loading) {
        // router.replace('/');

        return (
          <div>
            <Dialog
              open={open}
              fullWidth
              fullScreen
              // onClose={() => setOpen(false)}
              id={'registerPopover'}
              key={'registerPopover'}
            >
              <ContentStyle>
                <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                      Join meeting
                    </Typography>
                  </Box>
                </Box>

                {isOtp ? (
                  <VerifyCode id={query.meetingid} mobile={mobile} setAuthMeeting={setAuthMeeting} />
                ) : (
                  <RegisterForm
                    query={query}
                    id={query.meetingid}
                    setOtp={setOtp}
                    hasPassword={meetData.password}
                    setMobile={setMobile}
                  />
                )}
                {/* <VerifyCode /> */}
                <div id="captcha-container"></div>
                <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                  By clicking on Join meeting, you agree to our &nbsp;
                  <Link underline="always" color="text.primary" href="#">
                    Terms and conditions &nbsp;
                  </Link>
                  and you acknowledge having read our &nbsp;
                  <Link underline="always" color="text.primary" href="#">
                    Privacy Policy
                  </Link>
                  .
                </Typography>
                <Divider sx={{ mt: 8 }} />
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link passHref href={'/auth/Login'}>
                    <Link variant="subtitle2">Login</Link>
                  </Link>
                </Typography>
              </ContentStyle>
            </Dialog>
          </div>
        );
      }
      if (localStorage.getItem('isAuthenticated') && meetData.password) {
        return (
          <Dialog
            open={open}
            maxWidth={'sm'}
            fullWidth
            fullScreen
            // onClose={() => setOpen(false)}
            id={'registerPopover'}
            key={'registerPopover'}
          >
            <ContentStyle>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Enter Password
                  </Typography>
                </Box>
              </Box>

              <PasswordForm query={query} id={query.meetingid} setAuthMeeting={setAuthMeeting} />
              {/* <VerifyCode /> */}
              <div id="captcha-container"></div>
            </ContentStyle>
          </Dialog>
        );
      }

      // If this is an accessToken we just render the component that was passed with all its props
      // if (!loading) return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withMeetingAuth;
