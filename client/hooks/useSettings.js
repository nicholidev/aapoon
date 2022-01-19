/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
