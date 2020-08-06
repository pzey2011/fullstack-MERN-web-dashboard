import React, { useReducer } from 'react'

const initialState = {
    devices: [
    ] ,
    selectedDevice:{},
    selectedDeviceIndex:-1,
    editDisplay:false, 
}

const reducer  = (state = initialState, { type, payload }) => {
    switch (type) {

    case 'SET_DEVICES':
        return { ...state, devices:payload }
    case 'SET_SELECTED_DEVICE':
        return { ...state, selectedDevice:payload }
    case 'SET_SELECTED_DEVICE_INDEX':
        return { ...state, selectedDeviceIndex:payload }
    case 'SET_EDIT_DISPLAY':
        return { ...state, editDisplay:payload }
    case 'UPDATE_DEVICE':
        const updatedList = state.devices.map((item, j) => {
            if (j === state.selectedDeviceIndex) {
              return {name:payload.name, serial:item.serial, model:item.model, note:payload.note};
            } else {
              return item;
            }
          });
          return { ...state, devices:updatedList }
    default:
        return state
    }
}
const useGlobalState = () =>{
    const [globalState,globalDispatch]  = useReducer(reducer,initialState)
    return {globalState,globalDispatch}
}
export default useGlobalState;