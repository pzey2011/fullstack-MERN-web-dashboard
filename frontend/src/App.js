import React, { useEffect,useContext } from 'react';
import axios from 'axios';
import DeviceList from './DeviceList';
import EditForm from './EditForm';
import * as actions from './store/GlobalActions';
import {BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import GlobalContext from './store/GlobalContext';

function App() {
  const {globalState,globalDispatch} = useContext(GlobalContext);
  useEffect(()=>{
    const fetchDevices = async () => {
      try {
        const responseData = await axios.get(
          'http://localhost:5000/api/devices'
        );
        const devices = responseData.data.member.map((item)=>{
          return {name:item.name,model:item.deviceModel,serial:item.serial,note:item.note}
          })
        actions.setDevices(devices,globalDispatch);
      } catch (err) {}
    };
    fetchDevices()
  })
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/devices" component = {DeviceList} />
          <Route exact path="/edit" component = {EditForm} />
          <Redirect from='/' to='/devices' />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
