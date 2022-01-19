/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Radio(theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
          svg: {
            fontSize: 24,
            '&[font-size=small]': {
              fontSize: 20,
            },
          },
        },
      },
    },
  };
}
