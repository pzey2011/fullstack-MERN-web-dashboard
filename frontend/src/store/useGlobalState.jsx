import React, { useReducer } from 'react';
import { useThunkReducer } from 'react-hook-thunk-reducer';

const initialState = {
    devices: [
    ] ,
    selectedDevice:{},
    selectedDeviceIndex:-1,
    editFormDisplay:false, 
    createFormDisplay:false,
    link:'http://localhost:5000/',
    status: null,
    response: null,
    editDeviceIndex:-1,
}

const reducer  = (state = initialState, { type, payload }) => {
    switch (type) {
    case 'API_FETCHING':
        return { ...initialState, status: 'FETCHING' };
    case 'API_SUCCESS':
        return { ...state, status: 'SUCCESS',response: payload };
    case 'API_ERROR':
        return { ...state, status: 'ERROR',response: payload };
    case 'SET_DEVICES':
        return { ...state, devices:payload }
    case 'SET_SELECTED_DEVICE':
        return { ...state, selectedDevice:payload }
    case 'SET_SELECTED_DEVICE_INDEX':
        return { ...state, selectedDeviceIndex:payload }
    case 'SET_EDIT_DEVICE_INDEX':
        return { ...state, editDeviceIndex:payload }
    case 'SET_EDIT_FORM_DISPLAY':
        return { ...state, editFormDisplay:payload }
    case 'SET_CREATE_FORM_DISPLAY':
        return { ...state, createFormDisplay:payload }
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
    const [globalState,globalDispatch]  = useThunkReducer(reducer,initialState)
    return {globalState,globalDispatch}
}
export default useGlobalState;