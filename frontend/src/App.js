import React, { useEffect,useContext,useState } from 'react';
import axios from 'axios';
import DeviceList from './pages/DeviceList';
import EditForm from './pages/EditForm';
import CreateForm from './pages/CreateForm';
import * as actions from './store/GlobalActions';
import {BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import GlobalContext from './store/GlobalContext';

function App() {
  const {globalState,globalDispatch} = useContext(GlobalContext);
  const [devicesFetched,setDevicesFetched] = useState(false);
  useEffect(()=>{
    const fetchDevices = async () => {
      try {
        const responseData = await axios.get(
          globalState.link+'api/devices'
        );
        const devices = responseData.data.member.map((item)=>{
          return {name:item.name,model:item.deviceModel,serial:item.serial,note:item.note}
          })
        actions.setDevices(devices,globalDispatch);
        setDevicesFetched(true);
      } catch (err) {}
    };
    fetchDevices()
  },[devicesFetched==false])
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/devices" component = {DeviceList} />
          <Route exact path="/devices/:id/edit" component = {EditForm} />
          <Route exact path="/devices/create" component = {CreateForm} />
          <Redirect from='/' to='/devices' />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
