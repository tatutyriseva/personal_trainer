import React from 'react';
import './App.css';
import Customers from './components/Customers';
import Workouts from './components/Workouts';
import Calendar from './components/Calendar.js';
import Nav from './components/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
            <Switch>
              <Route exact path="/" component={Customers} />
              <Route path ="/customers" component={Customers} />
              <Route path="/workouts" component={Workouts} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
