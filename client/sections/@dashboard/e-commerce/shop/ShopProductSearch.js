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
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import SearchNotFound from '../../../../components/SearchNotFound';

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

export default function ShopProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const linkTo = (name) => `${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(name)}`;

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/products/search', {
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
        getOptionLabel={(product) => product.name}
        noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search product..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, post, { inputValue }) => {
          const { name } = post;
          const matches = match(name, inputValue);
          const parts = parse(name, matches);
          return (
            <li {...props}>
              <Link to={linkTo(name)} component={RouterLink} underline="none">
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
