import { AppBar, Toolbar, Typography, Menu, MenuItem, Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Container } from "@mui/system";
import React, { ReactNode, useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logout } from '../../services/auth.service';
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [name, setName] = useState("");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutClick = ()=> {
    logout();
    navigate('/login');
  }
  

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("user") || "");
    setName(details.name);
  },[]);

  return (
    <div className="wrapper">
      <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {(
            <div>
              Welcome,
              {name}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{
                  handleClose();
                  logoutClick();
                }}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
        {children}
      </Container>
    </div>
  );
};
