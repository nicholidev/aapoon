/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useContext } from 'react';
import { AuthContext } from '../contexts/FirebaseContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
