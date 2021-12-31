/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// routes

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Overview',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Plan & Pricing',
    icon: <Iconify icon={'ic:round-grain'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Meetings',
    path: '/pages',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,

    children: [
      {
        items: [{ title: 'Login', path: '/' }],
      },
    ],
  },
  {
    title: 'Dashboard',
    isAuth: true,
    icon: <Iconify icon={'bx:bxs-dashboard'} {...ICON_SIZE} />,
    path: '/dashboard/one',
  },
];

export default menuConfig;
