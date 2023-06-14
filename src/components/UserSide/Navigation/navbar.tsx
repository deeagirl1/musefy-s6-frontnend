import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, InputBase } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { getToken, logout } from '../../../services/AuthService';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false); // Initial sign-in status
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state : any) => state.authentication.accessToken);
  const handleSignOut =  () => {
    dispatch(logout())
  }

  useEffect(() => {
    const checkSignInStatus = () => {
      try {
        if (token) {
          setIsSignedIn(true); // Update the sign-in status to true
        } else {
          setIsSignedIn(false); // Update the sign-in status to false
        }
      } catch (error: any) {
        // Handle sign-in error
        console.log(error.message);
      }
    };

    checkSignInStatus();
  }, [token]);

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

  // const handleSignOut = async () => {
  //   try {
  //     const response = logout();
  //     if (await response) {
  //       setIsSignedIn(false);
  //       setAnchorEl(null);
  //       window.location.href = '/';
  //     } else {
  //       // Handle sign-out failure
  //       // For example, display an error message or perform error handling
  //     }
  //   } catch (error) {
  //     // Handle sign-out error
  //     // For example, display an error message or perform error handling
  //   }
  // };

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
          <Button color="inherit" onClick={() => (window.location.href = '/songs')}>
            Songs
          </Button>
          <Button color="inherit" onClick={() => (window.location.href = '/radio')}>
            Radio
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
