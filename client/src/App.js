import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import LandingPage from './component/LandingPage/LandingPageV2'
// eslint-disable-next-line no-unused-vars
import Header from './component/Header/Header'
// eslint-disable-next-line no-unused-vars
import Footer from './component/Footer/Footer'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './component/Login/Login';
import CreateAccount from './component/CreateAccount/CreateAccount';
//import Cities from './component/Cities/Cities';
import ProfilePageCont from './component/ProfilePage/ProfilePageCont';
import LogOut from './component/Header/LogOut';
import './App.css';

class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path='/' component={LandingPage} />
          <Route path='/Login' component={Login} />
          <Route path='/CreateAccount' component={CreateAccount} />
          <Route path='/post' component={ProfilePageCont} />
          <Route path='/LogOut' component={LogOut} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
