/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  // const { userData, login, logoutUser } = useAuth();
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const router = useRouter();

      if (localStorage.getItem('isAuthenticated')) {
        router.replace(window?.location?.href.includes('return') ? window?.location?.href : '/dashboard/one');
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
