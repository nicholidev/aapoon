/*
 Copyright ©. All Rights Reserved. Confidential and proprietary.
 XYZ. Contact address: XYZ@xyz.pa .
 */
import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
// utils
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    width: 200,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
      width: 240,
      '& .MuiAutocomplete-inputRoot': {
        boxShadow: theme.customShadows.z12,
      },
    },
  },
  '& .MuiAutocomplete-inputRoot': {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  },
  '& .MuiAutocomplete-option': {
    '&:not(:last-of-type)': {
      borderBottom: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

export default function BlogPostsSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const linkTo = (title) => `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/blog/posts/search', {
          params: { query: value },
        });
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle
      sx={{
        ...(!searchQuery && {
          '& .MuiAutocomplete-noOptions': {
            display: 'none',
          },
        }),
      }}
    >
      <Autocomplete
        size="small"
        disablePortal
        popupIcon={null}
        options={searchResults}
        onInputChange={(event, value) => handleChangeSearch(value)}
        getOptionLabel={(post) => post.title}
        noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search post..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Iconify
                      icon="eva:search-fill"
                      sx={{
                        ml: 1,
                        width: 20,
                        height: 20,
                        color: 'text.disabled',
                      }}
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, post, { inputValue }) => {
          const { title } = post;
          const matches = match(title, inputValue);
          const parts = parse(title, matches);
          return (
            <li {...props}>
              <Link to={linkTo(title)} component={RouterLink} underline="none">
                {parts.map((part, index) => (
                  <Typography
                    key={index}
                    component="span"
                    variant="subtitle2"
                    color={part.highlight ? 'primary' : 'textPrimary'}
                  >
                    {part.text}
                  </Typography>
                ))}
              </Link>
            </li>
          );
        }}
      />
    </RootStyle>
  );
}
