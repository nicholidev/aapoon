/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Timeline(theme) {
  return {
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },

    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.divider,
        },
      },
    },
  };
}
