/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme, ownerState }) => {
  const isLight = theme.palette.mode === 'light';
  const { color, variant } = ownerState;

  const styleFilled = (color) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette[color].main,
  });
  const styleStatus = (color) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette[color].main,
    borderRadius: 4,
    fontSize: theme.typography.pxToRem(14),
    textTransform: 'capitalize',
    fontWeight: 400,
  });
  const styleOutlined = (color) => ({
    color: theme.palette[color].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[color].main}`,
  });

  const styleGhost = (color) => ({
    color: theme.palette[color][isLight ? 'dark' : 'light'],
    backgroundColor: alpha(theme.palette[color].main, 0.16),
  });

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 24,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 1.5),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
          ...(variant === 'filled' && { ...styleFilled(color) }),
          ...(variant === 'outlined' && { ...styleOutlined(color) }),
          ...(variant === 'status' && { ...styleStatus(color) }),
          ...(variant === 'ghost' && { ...styleGhost(color) }),
        }
      : {
          ...(variant === 'outlined' && {
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.grey[500_32]}`,
          }),
          ...(variant === 'ghost' && {
            color: isLight ? theme.palette.text.secondary : theme.palette.common.white,
            backgroundColor: theme.palette.grey[500_16],
          }),
        }),
  };
});

// ----------------------------------------------------------------------

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
  variant: PropTypes.oneOf(['filled', 'outlined', 'status', 'ghost']),
};

export default function Label({ color = 'default', variant = 'ghost', children, ...other }) {
  return (
    <RootStyle ownerState={{ color, variant }} {...other}>
      <Typography variant="caption">{children}</Typography>
    </RootStyle>
  );
}
