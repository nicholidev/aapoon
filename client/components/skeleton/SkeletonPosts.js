/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
// @mui
import { Box, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonPosts() {
  return (
    <Box
      sx={{
        mt: 3,
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
      }}
    >
      {[...Array(8)].map((_, index) => (
        <Box key={index}>
          <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
          <Box sx={{ display: 'flex', mt: 1.5 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
