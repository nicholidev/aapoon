import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Grid, Avatar, Typography, CardContent, Link, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import SvgIconStyle from '../../../components/SvgIconStyle';
import TextIconLabel from '../../../components/TextIconLabel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;
  const latestPostLarge = index === 0;
  const latestPost = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <Box
          sx={{
            position: 'relative',
            paddingTop: 'calc(100% * 3 / 4)',
            ...((latestPostLarge || latestPost) && {
              pt: 'calc(100% * 4 / 3)',
            }),
            ...(latestPostLarge && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }),
          }}
        >
          <SvgIconStyle
            src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...((latestPostLarge || latestPost) && { display: 'none' }),
            }}
          />
          <Avatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              zIndex: 9,
              width: 32,
              height: 32,
              left: 24,
              bottom: -16,
              position: 'absolute',
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />

          {(latestPostLarge || latestPost) && <OverlayStyle />}
          <Image alt={title} src={cover} sx={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
        </Box>

        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: '100%',
              zIndex: 10,
              position: 'absolute',
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{
              color: 'text.disabled',
              ...((latestPostLarge || latestPost) && {
                opacity: 0.72,
                color: 'common.white',
              }),
            }}
          >
            {fDate(createdAt)}
          </Typography>

          <Link component={RouterLink} to={linkTo} color={latestPostLarge || latestPost ? 'common.white' : 'inherit'}>
            <TextMaxLine persistent line={2} variant={latestPostLarge ? 'h5' : 'subtitle2'}>
              {title}
            </TextMaxLine>
          </Link>

          <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            sx={{
              mt: 3,
              color: 'text.disabled',
              ...((latestPostLarge || latestPost) && {
                opacity: 0.72,
                color: 'common.white',
              }),
            }}
          >
            {POST_INFO.map((info, index) => (
              <TextIconLabel
                key={index}
                icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
                value={fShortenNumber(info.number)}
                sx={{ typography: 'caption' }}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
}
