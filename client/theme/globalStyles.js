/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// @mui
import { useTheme } from '@mui/material/styles';
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <MUIGlobalStyles
      styles={{
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        html: {
          width: '100%',
          height: '100%',
          WebkitOverflowScrolling: 'touch',
        },
        body: {
          width: '100%',
          height: '100%',
        },
        '#__next': {
          width: '100%',
          height: '100%',
        },
        input: {
          '&[type=number]': {
            MozAppearance: 'textfield',
            '&::-webkit-outer-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
            '&::-webkit-inner-spin-button': {
              margin: 0,
              WebkitAppearance: 'none',
            },
          },
        },
        textarea: {
          '&::-webkit-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::-moz-placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
          },
          '&:-ms-input-placeholder': {
            color: theme.palette.text.disabled,
          },
          '&::placeholder': {
            color: theme.palette.text.disabled,
          },
        },
        img: { display: 'block', maxWidth: '100%' },
        '#jitsiMeeting-5': {height: '100%'},
        '.jitsi-wrap': {
          iframe: {
            marginBottom: '-100px'
          }
        },
        '.fc-event': {
          overflow: 'hidden'
        },
        '.fc-list-event-title': {
          wordBreak: 'break-all'
        }
      }}
    />
  );
}
