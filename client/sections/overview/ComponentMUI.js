/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// @mui
import { Typography, Grid, Box } from '@mui/material';
//
import ComponentCard from './ComponentCard';
import { MATERIAL_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentMUI() {
  return (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          Material UI
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Components from MUI
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          }}
        >
          {MATERIAL_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}
