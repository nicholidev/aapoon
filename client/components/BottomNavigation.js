/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Iconify from './Iconify';
import { useRouter } from 'next/router';
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ICON_SIZE = {
    width: 22,
    height: 22,
  };
  const { replace, pathname } = useRouter();
  useEffect(() => {
    if (pathname == '/dashboard/one') {
      setValue(0);
    }
    if (pathname == '/dashboard/calendar') {
      setValue(1);
    }
    if (pathname == '/dashboard/recordings') {
      setValue(2);
    }
  }, [pathname]);
  return (
    <Box style={{ width: '100vw' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Dashboard"
          onClick={() => replace('/dashboard/one')}
          icon={<Iconify icon={'lucide:layout-dashboard'} {...ICON_SIZE} />}
        />
        <BottomNavigationAction
          onClick={() => replace('/dashboard/calendar')}
          label="Calendar"
          icon={<Iconify icon={'uil:calender'} {...ICON_SIZE} />}
        />
        <BottomNavigationAction
          onClick={() => replace('/dashboard/recordings')}
          label="Recordings"
          icon={<Iconify icon={'ant-design:video-camera-add-outlined'} {...ICON_SIZE} />}
        />
      </BottomNavigation>
    </Box>
  );
}
