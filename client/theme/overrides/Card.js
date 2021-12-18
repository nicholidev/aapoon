/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Card(theme) {
  const isLight = theme.palette.mode === 'light';

  const boxShadow = `0 0 2px 0 ${alpha(isLight ? theme.palette.grey[500] : theme.palette.common.black, 0.2)}, ${
    theme.customShadows.z12
  }`;

  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow,
          position: 'relative',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: 'h6' },
        subheaderTypographyProps: { variant: 'body2', marginTop: theme.spacing(0.5) },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
}
