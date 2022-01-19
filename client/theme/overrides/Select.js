/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
//
//
import { InputSelectIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Select() {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },

      styleOverrides: {
        root: {},
      },
    },
  };
}
