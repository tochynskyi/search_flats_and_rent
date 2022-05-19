import React, { useState } from 'react';
import { useUser } from 'reactfire';
import firebase from 'firebase';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import clearFirestoreCache from '../../common/clearFirestoreCache';

const Header: React.FC = () => {
  const { data } = useUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    firebase.auth().signOut();
    clearFirestoreCache();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      bgcolor="#F50057"
      position="fixed"
      top="0"
      paddingX="27px"
      paddingY="14px"
    >
      <Grid container>
        <MenuIcon
          sx={{ width: '25', height: '20', color: '#fff', marginRight: '31px' }}
        />
        <Typography
          variant="h3"
          sx={{ color: '#fff', fontWeight: '500', fontSize: '20px' }}
        >
          Voypost
        </Typography>
      </Grid>
      <Grid>
        <Button onClick={handleOpen}>
          <Avatar>{data.displayName ? data.displayName[0] : 'U'}</Avatar>
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </Grid>
    </Box>
  );
};

export default Header;
