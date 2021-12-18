/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import PropTypes from 'prop-types';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Link, Avatar, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import SocialsButton from '../../../../components/SocialsButton';
import SearchNotFound from '../../../../components/SearchNotFound';

// ----------------------------------------------------------------------

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  marginBottom: theme.spacing(5),
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

ProfileFriends.propTypes = {
  friends: PropTypes.array,
  findFriends: PropTypes.string,
  onFindFriends: PropTypes.func,
};

export default function ProfileFriends({ friends, findFriends, onFindFriends }) {
  const friendFiltered = applyFilter(friends, findFriends);
  const isNotFound = friendFiltered.length === 0;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <SearchStyle
        value={findFriends}
        onChange={(e) => onFindFriends(e.target.value)}
        placeholder="Find friends..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        }
      />

      <Grid container spacing={3}>
        {friendFiltered.map((friend) => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend} />
          </Grid>
        ))}
      </Grid>

      {isNotFound && (
        <Box sx={{ mt: 5 }}>
          <SearchNotFound searchQuery={findFriends} />
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

FriendCard.propTypes = {
  friend: PropTypes.object,
};

function FriendCard({ friend }) {
  const { name, role, avatarUrl } = friend;

  return (
    <Card
      sx={{
        py: 5,
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Avatar alt={name} src={avatarUrl} sx={{ width: 64, height: 64, mb: 3 }} />
      <Link to="#" variant="subtitle1" color="text.primary" component={RouterLink}>
        {name}
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {role}
      </Typography>

      <SocialsButton initialColor />

      <IconButton sx={{ top: 8, right: 8, position: 'absolute' }}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>
    </Card>
  );
}
// ----------------------------------------------------------------------

function applyFilter(array, query) {
  let arr = array;
  if (query) {
    arr = filter(array, (_friend) => _friend.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return arr;
}
