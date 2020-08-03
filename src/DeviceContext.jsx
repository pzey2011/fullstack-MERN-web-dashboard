import React, { createContext,useState } from 'react';
export const DeviceContext = createContext();
export const selectedDeviceIndexContext = createContext();
export const DeviceProvider = props => {
    const [selectedDeviceIndex,setSelectedDeviceIndex]= useState(-1);
    const [devices,setDevices] = useState( [
        { name:'Wifi Level Sensor', serial:'70B3D5CD00100000', model:'PLD2-W', note:'Testing level sensor.'},
        { name:'Wifi Level Sensor', serial:'FFFFFFFFFFFFFFFF', model:'PLD2-W', note:'Testing level sensor.'}
      ] );
    return (
        <DeviceContext.Provider value={ [devices,setDevices]}>
            <selectedDeviceIndexContext.Provider value={[selectedDeviceIndex,setSelectedDeviceIndex]}>
                {props.children}
            </selectedDeviceIndexContext.Provider>
        </DeviceContext.Provider>
    );
};
