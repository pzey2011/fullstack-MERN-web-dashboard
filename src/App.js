import React , {useEffect , useState} from 'react';
import DeviceList from './DeviceList';
import EditForm from './EditForm'

function createData(name,serial,model, note) {
  return { name,serial, model, note };
}

function App() {
  const [devices,setDevices] = useState( [
      createData('Wifi Level Sensor', '70B3D5CD00100000', 'PLD2-W', 'Testing level sensor'),
      createData('Wifi Level Sensor', 'FFFFFFFFFFFFFFFF', 'PLD2-W', 'Testing level sensor')
  ] );
  const [editDisplay,setEditDisplay] = useState(false);
  const [selectedDevice,setSelectedDevice]= useState({name:'',serial:'',model:'',note:''});
  useEffect(()=>{
  })
 
  return (
    <React.Fragment>
      <DeviceList devices={devices} setFormOpen={(isOpen,index)=>{setEditDisplay(isOpen);debugger;setSelectedDevice(devices[index]);}}/>
      <EditForm open={editDisplay} device={selectedDevice} setOpen={(isOpen)=>setEditDisplay(isOpen)} updateDevice={(newDevice)=>setDevices(state => [...state, newDevice])} />
    </React.Fragment>
  );
}

export default App;
