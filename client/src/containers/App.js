
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Navbar, Landing, Footer, Register, Login } from '../components'
import './App.css';

export default class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={ Landing } />
          <div className='container'>
            <Route exact path='/register' component={ Register } />
            <Route exact path='/login' component={ Login } />

          </div>
          <Footer />
        </div>

      </Router>

    )
  }
}
