/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Skeleton(theme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },

      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
