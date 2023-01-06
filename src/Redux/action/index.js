export const addLoginData=(loginData,ClientId)=>{
    return{
        type:"AddLoginData",
        payload: {loginData,ClientId}
    }
}
export const updateLogoutStore=()=>{
    return{
        type:"UpdateLogoutStore"
    }
}
export const AlertUpdate=(type, title, message)=>{
    return{
        type:"updateAlert",
        payload:{type, title, message}
    }
}
export const changeAlertState=()=>{
    return{
        type:"ChangeAlertState"
    }
}

export const loadStockData =(data)=>{
    return{
        type:"LoadData",
        payload:{data}
    }
}