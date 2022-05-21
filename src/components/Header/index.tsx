import React, { useState } from 'react';
import { useAuth, useUser } from 'reactfire';
import { makeStyles } from '@mui/styles';
import { AppBar, Avatar, Button, Grid, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import clearFirestoreCache from '../../common/clearFirestoreCache';

const useStyles = makeStyles({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    padding: '0 30px',
  },
  menuIcon: {
    width: 25,
    height: 20,
    marginRight: 31,
  },
});

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: user } = useUser();
  const auth = useAuth();
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const userInitials = () => {
    if (user.displayName) {
      const initials = user.displayName
        .split(' ')
        .map((name: string) => name[0])
        .join('');
      return initials;
    }
    return 'U';
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    auth.signOut();
    clearFirestoreCache();
  };

  return (
    <AppBar className={classes.container}>
      <Grid container alignItems="center">
        <MenuIcon className={classes.menuIcon} />
        <Typography variant="h4">Voypost</Typography>
      </Grid>
      <Grid>
        <Button onClick={handleOpen}>
          <Avatar>{userInitials()}</Avatar>
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
    </AppBar>
  );
};

export default Header;
