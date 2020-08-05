export const setDevices = (devices,dispatch) =>{
    dispatch({type:'SET_DEVICES', payload:devices})
}
export const setSelectedDevice = (device,dispatch) =>{
    dispatch({type:'SET_SELECTED_DEVICE', payload:device})
}
export const setSelectedDeviceIndex = (index,dispatch) =>{
    dispatch({type:'SET_SELECTED_DEVICE_INDEX', payload:index})
}
export const setEditDisplay = (isOpen,dispatch) =>{
    dispatch({type:'SET_EDIT_DISPLAY', payload:isOpen})
}

export const updateDevice=(values,dispatch)=>{
    dispatch({type:'UPDATE_DEVICE', payload:values}) 
}