/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Tooltip(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[isLight ? 800 : 700],
        },
        arrow: {
          color: theme.palette.grey[isLight ? 800 : 700],
        },
      },
    },
  };
}
