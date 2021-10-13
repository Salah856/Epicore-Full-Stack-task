import * as React from 'react'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import AppBar from './layouts/Navbar';
import CreateCoupon from './components/CreateCoupon'; 
import ApplyCoupon from './components/ApplyCoupon'; 
import Box from '@material-ui/core/Box';

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar/>
        <Switch>
          <Route path="/create-coupon">
            <Box mt={12}>
              <CreateCoupon />
            </Box>
          </Route>
          <Route path="/apply-coupon">
            <Box mt={12}>
              <ApplyCoupon />
            </Box>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
