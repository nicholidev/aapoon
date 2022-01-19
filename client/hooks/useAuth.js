/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useContext } from 'react';
//import { AuthContext } from '../contexts/JWTContext';
import { AuthContext } from '../contexts/FirebaseContext';
// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';

// ----------------------------------------------------------------------

const useAuth = () => useContext(AuthContext);

export default useAuth;
