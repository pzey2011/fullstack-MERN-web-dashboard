import React from 'react';
import DeviceList from './DeviceList';
import EditForm from './EditForm';
import {BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'

function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/devices" component = {DeviceList} />
          <Route exact path="/devices/:id/edit" component = {EditForm} />
          <Redirect from='/' to='/devices' />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
