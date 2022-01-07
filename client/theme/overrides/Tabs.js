/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// ----------------------------------------------------------------------

export default function Tabs(theme) {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: 30,
          backgroundColor: '#fff',
        },
        indicator: {
          borderRadius: '10px 10px 0 0',
          height: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '0 28px',
          fontWeight: theme.typography.fontWeightMedium,
          borderRadius: 30,
          '&.Mui-selected': {
            color: theme.palette.common.white,
            backgroundColor: '#225082',
          },
        },
        labelIcon: {
          minHeight: 48,
          flexDirection: 'row',
          '& > *:first-of-type': {
            marginBottom: 0,
            marginRight: theme.spacing(1),
          },
        },
        wrapper: {
          flexDirection: 'row',
          whiteSpace: 'nowrap',
        },
        textColorInherit: {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTabScrollButton: {
      styleOverrides: {
        root: {
          width: 48,
          borderRadius: '50%',
        },
      },
    },
  };
}
