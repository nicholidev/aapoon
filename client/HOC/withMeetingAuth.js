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
import useMediaQuery from '@mui/material/useMediaQuery';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { getMeetingDetails, joinMeeting } from '../api/meeting';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 680,
  height: '100%',
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
      const [requirePass, setRequirePass] = useState(false);
      const [token, setToken] = useState('');
      const [name, setName] = useState('');
      const [domain,setDomain]=useState("meetaap.in")
      const [authMeeting, setAuthMeeting] = useState({
        isAuth: localStorage.getItem('mid') === query.meetingid,
        id: localStorage.getItem('mid'),
        jwt: localStorage.getItem('mjwt'),
      });
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
      // console.log(authMeeting, localStorage.getItem('mjwt'));
      useEffect(() => {
        setLoading(true);
        if (query.meetingid) {
          if (localStorage.getItem('isAuthenticated'))
            joinMeeting({ id: query.meetingid })
              .then((data) => {
                setLoading(false);
                setDomain(data?.data.domain)
                setMeetData(data?.data?.data);
                setToken(data?.data.token);
              })
              .catch((err) => {
                if (err.response.status === 403) setRequirePass(true);
                setLoading(false);
                if (err.response.status === 500) setError('invalid-meeting');
              });

          getMeetingDetails(query.meetingid)
            .then((data) => {
              setLoading(false);
              setMeetData(data?.data?.data);
            })
            .catch((err) => {
              setLoading(false);
              if (err.response.status === 500) setError('invalid-meeting');
            });
        }

        if (localStorage.getItem('isAuthenticated') && !meetData?.password) {
          setAuthMeeting({
            isAuth: true,
            id: query.meetingid,
            jwt: token,
          });
        } else {
          setAuthMeeting({
            isAuth: localStorage.getItem('mid') === query.meetingid,
            id: localStorage.getItem('mid'),
            jwt: localStorage.getItem('mjwt'),
          });
        }
      }, [query?.meetingid]);

      useEffect(() => {
        if (localStorage.getItem('isAuthenticated') && !meetData?.password) {
          setAuthMeeting({
            isAuth: true,
            id: query.meetingid,
            jwt: token,
          });
        } else {
          setAuthMeeting({
            isAuth: localStorage.getItem('mid') === query.meetingid,
            id: localStorage.getItem('mid'),
            jwt: localStorage.getItem('mjwt'),
          });
        }
      }, [token, query?.meetingid]);

      useEffect(() => {
        setRequirePass(false);
        // console.log(authMeeting.jwt);
      }, [authMeeting.jwt]);

      // console.log(meetData);
      // console.log(authMeeting);
      if (error === 'invalid-meeting') {
        // router.replace('/');

        return (
          <div>
            <Dialog
              open={open}
              maxWidth={'xs'}
              fullWidth
              fullScreen={fullScreen}
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

      if (!localStorage.getItem('isAuthenticated') && !authMeeting.isAuth && !loading) {
        // router.replace('/');

        return (
          <div>
            <Dialog
              open={open}
              fullWidth
              fullScreen={fullScreen}
              // onClose={() => setOpen(false)}
              id={'registerPopover'}
              key={'registerPopover'}
            >
              <ContentStyle>
                <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', maxWidth: 480 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                      Join meeting
                    </Typography>
                  </Box>
                </Box>

                {isOtp ? (
                  <VerifyCode id={query.meetingid} mobile={mobile} setAuthMeeting={setAuthMeeting} name={name} />
                ) : (
                  <RegisterForm
                    query={query}
                    id={query.meetingid}
                    setOtp={setOtp}
                    hasPassword={meetData?.password}
                    setMobile={setMobile}
                    setName={setName}
                  />
                )}
                {/* <VerifyCode /> */}
                <div id="captcha-container"/>
                <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                  By clicking on Join meeting, you agree to our &nbsp;
                  <Link underline="always" color="text.primary" href="/about/terms-of-service">
                    Terms of Service &nbsp;
                  </Link>
                  and you acknowledge having read our &nbsp;
                  <Link underline="always" color="text.primary" href="/about/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </Typography>
                <Divider sx={{ mt: 8 }} />
                <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                  Already have an account?{' '}
                  <Link passHref href={'/auth/Login?return=' + window.location.href}>
                    <Link variant="subtitle2">Login</Link>
                  </Link>
                </Typography>
              </ContentStyle>
            </Dialog>
          </div>
        );
      }
      if (localStorage.getItem('isAuthenticated') && requirePass) {
        return (
          <Dialog
            open={open}
            fullWidth
            maxWidth={'xs'}
            fullScreen={fullScreen}
            // onClose={() => setOpen(false)}
            id={'registerPopover'}
            key={'registerPopover'}
          >
            <ContentStyle>
              <Box sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Enter Password
                  </Typography>
                </Box>
              </Box>

              <PasswordForm query={query} id={query.meetingid} setAuthMeeting={setAuthMeeting} />
              {/* <VerifyCode /> */}
              <div id="captcha-container"/>
            </ContentStyle>
          </Dialog>
        );
      }
      if (authMeeting.isAuth === true && authMeeting.jwt) return <WrappedComponent {...props} domain={domain} token={authMeeting.jwt} />;
      else
        return (
          <Box height={'100vh'} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" align="center" gutterBottom>
              Loading ...
            </Typography>
          </Box>
        );

      // If this is an accessToken we just render the component that was passed with all its props
      // if (!loading) return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withMeetingAuth;
