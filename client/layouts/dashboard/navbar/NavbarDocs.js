// @mui
import { Stack, Button, Typography } from '@mui/material';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  return (
    <Stack spacing={3} alignItems="center" sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center' }}>
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, Kiley Barker
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Need help?
          <br /> Please check our docs
        </Typography>
      </div>

      <Button variant="contained">Documentation</Button>
    </Stack>
  );
}
