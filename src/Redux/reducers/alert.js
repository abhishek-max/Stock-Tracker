const initialState={
    status:false,
    type:'',
    title:'',
    message:''
}

const alertData=(state=initialState,action)=>{
    switch (action.type) {
        case "updateAlert":
            return{
                ...state,
                status:true,
                type:action.payload.type,
                title:action.payload.title,
                message:action.payload.message
            }
        case "ChangeAlertState":
            return{
                ...state,
                status:false,
                type:'',
                title:'',
                message:''
            }
        
    
        default:
            return state;
    }
}

export default alertData;