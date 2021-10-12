import * as React from 'react'; 
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import AppBar from './Navbar';
import CreateCoupon from './components/CreateCoupon'; 
import ApplyCoupon from './components/ApplyCoupon'; 

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar/>
        <Switch>
          <Route path="/create-coupon">
            <CreateCoupon />
          </Route>
          <Route path="/apply-coupon">
            <ApplyCoupon />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
