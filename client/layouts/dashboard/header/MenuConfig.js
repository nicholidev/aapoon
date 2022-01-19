/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// routes

// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Dashboard',
    icon: <Iconify icon={'lucide:layout-dashboard'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Calendar',
    icon: <Iconify icon={'uil:calender'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Recordings',
    path: '/pages',
    icon: <Iconify icon={'ant-design:video-camera-add-outlined'} {...ICON_SIZE} />,
  },
];

export default menuConfig;
