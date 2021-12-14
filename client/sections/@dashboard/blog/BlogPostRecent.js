import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Grid, Link, Card, Avatar, Typography, CardContent } from '@mui/material';
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

// ----------------------------------------------------------------------

BlogPostRecent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default function BlogPostRecent({ posts }) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Grid>
    </>
  );
}

// ----------------------------------------------------------------------

PostItem.propTypes = {
  post: PropTypes.object,
};

function PostItem({ post }) {
  const { cover, title, view, comment, share, author, createdAt } = post;

  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <SvgIconStyle
            src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
            }}
          />
          <Avatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
              left: 24,
              zIndex: 9,
              width: 32,
              height: 32,
              bottom: -16,
              position: 'absolute',
            }}
          />
          <Image alt="cover" src={cover} ratio="4/3" />
        </Box>

        <CardContent sx={{ pt: 4.5 }}>
          <Typography gutterBottom variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(createdAt)}
          </Typography>

          <Link to={linkTo} color="inherit" component={RouterLink}>
            <TextMaxLine variant="subtitle2" line={2} persistent>
              {title}
            </TextMaxLine>
          </Link>

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexWrap: 'wrap',
              color: 'text.disabled',
              justifyContent: 'flex-end',
            }}
          >
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
