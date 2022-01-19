/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { Box, Paper, Radio, RadioGroup, CardActionArea, FormControlLabel } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function SettingDirection() {
  const { themeDirection, onChangeDirection } = useSettings();

  return (
    <RadioGroup name="themeDirection" value={themeDirection} onChange={onChangeDirection}>
      <Box
        dir="ltr"
        sx={{
          display: 'grid',
          gap: 2.5,
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
      >
        {['ltr', 'rtl'].map((direction, index) => (
          <Paper
            key={direction}
            variant="outlined"
            sx={{
              width: 1,
              zIndex: 0,
              borderRadius: 1.25,
              overflow: 'hidden',
              position: 'relative',
              ...(themeDirection === direction && {
                boxShadow: (theme) => theme.customShadows.z12,
              }),
            }}
          >
            <CardActionArea sx={{ color: 'primary.main' }}>
              <Box
                sx={{
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  ...(index === 1 && { alignItems: 'flex-end' }),
                }}
              >
                {[56, 36, 24].map((size, index) => (
                  <Box
                    key={size}
                    sx={{
                      my: 0.5,
                      width: size,
                      height: size / 2.5,
                      borderRadius: 0.75,
                      bgcolor: themeDirection === direction ? 'primary.main' : 'grey.500',
                      ...(index === 0 && { opacity: 0.64 }),
                      ...(index === 1 && { opacity: 0.32, borderRadius: '4px' }),
                      ...(index === 2 && { opacity: 0.16, borderRadius: '3px' }),
                    }}
                  />
                ))}
              </Box>
              <FormControlLabel
                label=""
                value={direction}
                control={<Radio sx={{ display: 'none' }} />}
                sx={{
                  m: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  position: 'absolute',
                }}
              />
            </CardActionArea>
          </Paper>
        ))}
      </Box>
    </RadioGroup>
  );
}
