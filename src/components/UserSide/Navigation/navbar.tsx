import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton, Menu, MenuItem } from '@mui/material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state : any) => state.authentication.accessToken);

  const handleSignOut =  () => {
    dispatch(logout())
    navigate('/');
  }

  const handleSignIn = () => {
      navigate('/login');
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle search submit logic
  };

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#000000' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" style={{ marginRight: '20px' }}>
            Musefy
          </Typography>
          <Button color="inherit" onClick={() => (window.location.href = '/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => (window.location.href = '/browse')}>
            Browse
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
              <InputBase
                placeholder="Search..."
                style={{ backgroundColor: '#fff', borderRadius: '20px', width: '400px', padding: '4px 8px', marginRight: '8px' }}
              />
              <IconButton color="inherit" type="submit">
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleSearchClose}>
                <ClearIcon />
              </IconButton>
            </form>
          ) : (
            <>
              <IconButton color="inherit" onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
              {token ? (
                <>
                  <Button color="inherit" onClick={() => navigate("/my-favourite-songs")}>
                     My Favourite Songs
                  </Button>
                  <IconButton color="inherit" onClick={handleAccountClick}>
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleAccountClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    <MenuItem onClick={() => (window.location.href = '/my-account')}>Account</MenuItem>
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button color="inherit" onClick={handleSignIn}>
                  Sign In
                </Button>
              )}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
