import React , {useEffect , useState} from 'react';
import DeviceList from './DeviceList';
import EditForm from './EditForm'


function App() {
  const [devices,setDevices] = useState( [
    { name:'Wifi Level Sensor', serial:'70B3D5CD00100000', model:'PLD2-W', note:'Testing level sensor.'},
    { name:'Wifi Level Sensor', serial:'FFFFFFFFFFFFFFFF', model:'PLD2-W', note:'Testing level sensor.'}
  ] );
  const [editDisplay,setEditDisplay] = useState(false);
  const [selectedDevice,setSelectedDevice]= useState({});
  const [selectedDeviceIndex,setSelectedDeviceIndex]= useState(-1);
  useEffect(()=>{
  })
 const updateDevice=(values)=>{
  const list = devices.map((item, j) => {
    if (j === selectedDeviceIndex) {
      return {name:values.name, serial:item.serial, model:item.model, note:values.note};
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
