import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


export default function NavBar() {
  return (
      <AppBar position="static" style={{width: '100%'}}>
        <Grid container spacing={2} columns={16}>
          <Toolbar style={{width: '100%'}}>
            <Grid item xs={6}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Typography variant="h6" component="div" style={{color: 'white'}}>
                    Merchant App
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Link to="/create-coupon">
                <Button style={{color: 'white'}}> Create Coupon </Button>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Link to="/apply-coupon">
                <Button style={{color: 'white'}}> Apply Coupon </Button>
              </Link>
            </Grid>
          </Toolbar>
        </Grid>
      </AppBar>
  );
}
