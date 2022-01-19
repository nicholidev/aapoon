/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      variants: [
        {
          props: { variant: 'outlined' },
          style: { borderColor: theme.palette.grey[500_12] },
        },
      ],

      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  };
}
