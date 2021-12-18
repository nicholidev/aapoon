/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { alpha } from '@mui/material/styles';
import { Box, Paper, Radio, RadioGroup, CardActionArea, FormControlLabel } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function SettingColorPresets() {
  const { themeColorPresets, onChangeColor, colorOption } = useSettings();

  return (
    <RadioGroup name="themeColorPresets" value={themeColorPresets} onChange={onChangeColor}>
      <Box
        dir="ltr"
        sx={{
          display: 'grid',
          gap: 1.5,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        {colorOption.map((color) => {
          const colorName = color.name;
          const colorValue = color.value;
          const isSelected = themeColorPresets === colorName;

          return (
            <Paper
              key={colorName}
              variant="outlined"
              sx={{
                borderRadius: 1.25,
                ...(isSelected && {
                  bgcolor: alpha(colorValue, 0.12),
                  border: `solid 2px ${colorValue}`,
                  boxShadow: `inset 0 4px 8px 0 ${alpha(colorValue, 0.24)}`,
                }),
              }}
            >
              <CardActionArea sx={{ borderRadius: 1.25, color: colorValue, height: 1 }}>
                <Box
                  sx={{
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: colorValue,
                      transform: 'rotate(-45deg)',
                      transition: (theme) =>
                        theme.transitions.create('all', {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.shorter,
                        }),
                      ...(isSelected && { transform: 'none' }),
                    }}
                  />
                </Box>

                <FormControlLabel
                  label=""
                  value={colorName}
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
          );
        })}
      </Box>
    </RadioGroup>
  );
}
