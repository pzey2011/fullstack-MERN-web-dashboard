import React , {useEffect , useState , useContext} from 'react';
import DeviceList from './DeviceList';
import EditForm from './EditForm';
import {DeviceContext,editDisplayContext,selectedDeviceContext} from './DeviceContext';

function App() {
  
  const [devices,setDevices] = useContext(DeviceContext); 
  const [editDisplay,setEditDisplay] = useContext(editDisplayContext); 
   const [selectedDevice,setSelectedDevice] =useContext(selectedDeviceContext); 

 
  return (
    <React.Fragment>
      <DeviceList />
      <EditForm />
    </React.Fragment>
  );
}

export default App;
