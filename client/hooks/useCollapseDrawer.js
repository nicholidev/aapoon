/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useContext } from 'react';
import { CollapseDrawerContext } from '../contexts/CollapseDrawerContext';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
