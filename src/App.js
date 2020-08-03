import React , {useEffect , useState , useContext} from 'react';
import DeviceList from './DeviceList';
import EditForm from './EditForm';
import {DeviceContext} from './DeviceContext';

function App() {
  
  const [devices,setDevices] = useContext(DeviceContext); 
  const [editDisplay,setEditDisplay] = useState(false);
  const [selectedDevice,setSelectedDevice]= useState({});
  useEffect(()=>{
    console.log("devices:")
    console.log(devices)
  })
 
  return (
    <React.Fragment>
      <DeviceList setFormOpen={(isOpen,index)=>{setEditDisplay(isOpen);debugger;setSelectedDevice(devices[index]);}}/>
      <EditForm open={editDisplay} device={selectedDevice} setOpen={(isOpen)=>setEditDisplay(isOpen)} />
    </React.Fragment>
  );
}

export default App;
