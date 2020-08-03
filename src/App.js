import React , {useEffect , useState} from 'react';
import DeviceList from './DeviceList';
import EditForm from './EditForm'

function createData(name,serial,model, note) {
  return { name,serial, model, note };
}

function App() {
  const [devices,setDevices] = useState( [
      createData('Wifi Level Sensor', '70B3D5CD00100000', 'PLD2-W', 'Testing level sensor.'),
      createData('Wifi Level Sensor', 'FFFFFFFFFFFFFFFF', 'PLD2-W', 'Testing level sensor.')
  ] );
  const [editDisplay,setEditDisplay] = useState(false);
  const [selectedDevice,setSelectedDevice]= useState({name:'',serial:'',model:'',note:''});
  const [selectedDeviceIndex,setSelectedDeviceIndex]= useState({name:'',serial:'',model:'',note:''});
  useEffect(()=>{
  })
 const updateDevice=(values)=>{
  const list = devices.map((item, j) => {
    if (j === selectedDeviceIndex) {
      return createData(values.name, item.serial, item.model, values.note);
    } else {
      return item;
    }
  });
  setDevices(list);
 }
  return (
    <React.Fragment>
      <DeviceList devices={devices} setFormOpen={(isOpen,index)=>{setEditDisplay(isOpen);setSelectedDevice(devices[index]);setSelectedDeviceIndex(index)}}/>
      <EditForm open={editDisplay} device={selectedDevice} setOpen={(isOpen)=>setEditDisplay(isOpen)} updateDevice={(values)=>updateDevice(values)} />
    </React.Fragment>
  );
}

export default App;
