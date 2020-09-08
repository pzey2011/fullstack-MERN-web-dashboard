
export const setDevices = (devices,dispatch) =>{
    dispatch({type:'SET_DEVICES', payload:devices})
}
export const setSelectedDevice = (device,dispatch) =>{
    dispatch({type:'SET_SELECTED_DEVICE', payload:device})
}
export const setSelectedDeviceIndex = (index,dispatch) =>{
    dispatch({type:'SET_SELECTED_DEVICE_INDEX', payload:index})
}
export const setCreateFormDisplay = (isOpen,dispatch) =>{
    dispatch({type:'SET_CREATE_FORM_DISPLAY', payload:isOpen})
}
export const setEditFormDisplay = (isOpen,dispatch) =>{
    dispatch({type:'SET_EDIT_FORM_DISPLAY', payload:isOpen})
}
export const updateDevice=(values,dispatch)=>{
    dispatch({type:'UPDATE_DEVICE', payload:values}) 
}
export const createDevice=(values,dispatch)=>{
    dispatch({type:'CREATE_DEVICE', payload:values}) 
}
export const setEditDeviceIndex = (payload,dispatch) => {dispatch({
    type: 'SET_EDIT_DEVICE_INDEX',
    payload
})}


export const fetching = () => ({ type: 'API_FETCHING' });
export const success = payload => ({ type: 'API_SUCCESS', payload });
export const error = payload => ({ type: 'API_ERROR', payload });