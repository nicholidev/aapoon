/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useState } from 'react';
import { Box, Grid, Card, Stack, Container, Typography, CardHeader, CardContent } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Editor from '../../components/editor';

// ----------------------------------------------------------------------

export default function PageThree() {
  const { themeStretch } = useSettings();
  const [quillContent, setQuillContent] = useState('');

  return (
    <Page title="Page Three">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" sx={{ mb: 5 }}>
          Demo editor for next js
        </Typography>

        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader title="Quill Editor" />
              <CardContent>
                <Editor id="simple-editor" value={quillContent} onChange={(value) => setQuillContent(value)} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3} sx={{ height: 1 }}>
              <Card
                sx={{
                  height: 1,
                  boxShadow: 0,
                  bgcolor: 'background.neutral',
                }}
              >
                <CardHeader title="Preview Plain Text" />
                <Box sx={{ p: 3 }} dangerouslySetInnerHTML={{ __html: quillContent }} />
              </Card>
              <Card
                sx={{
                  height: 1,
                  boxShadow: 0,
                  bgcolor: 'background.neutral',
                }}
              >
                <CardHeader title="Preview Html" />
                <Typography sx={{ p: 3 }}>{quillContent}</Typography>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

PageThree.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
