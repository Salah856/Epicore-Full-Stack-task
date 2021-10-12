import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{color: 'white', marginLeft: '100px'}}>
              Merchant App
          </Typography>

          <Link to="/create-coupon">
            <Button style={{flexGrow: 1, color: 'white', marginRight: '100px', marginLeft: '200px'}}> Create Coupon </Button>
          </Link>
          <Link to="/apply-coupon">
            <Button style={{flexGrow: 1, color: 'white', marginLeft: '100px'}}> Apply Coupon </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
