/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Progress(theme) {
  const isLight = theme.palette.mode === 'light';

  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
        bar: {
          borderRadius: 4,
        },
        colorPrimary: {
          backgroundColor: theme.palette.primary[isLight ? 'lighter' : 'darker'],
        },
        buffer: {
          backgroundColor: 'transparent',
        },
      },
    },
  };
}
