import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Search, Brightness4 } from '@mui/icons-material';

const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      <IconButton>
        <Search />
      </IconButton>
      <IconButton>
        <Brightness4 />
      </IconButton>
    </Box>
  );
};

export default Header;
