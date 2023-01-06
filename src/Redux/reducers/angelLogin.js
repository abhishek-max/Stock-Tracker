const initialAngelState={
    status:false,
    jwtToken:"",
    refreshToken:"",
    feedToken:'',
    ClientId:''
}

const updateLoginData = (state = initialAngelState, action)=>{
    switch (action.type) {
        case "AddLoginData":
            return{
                ...state,
                status:true,
                jwtToken : action.payload.loginData.jwtToken,
                refreshToken : action.payload.loginData.refreshToken,
                feedToken : action.payload.loginData.feedToken,
                ClientId : action.payload.ClientId,
            };
            
        case "UpdateLogoutStore":
            return{
                ...state,
                status:false,
                jwtToken : '',
                refreshToken : '',
                feedToken : '',
                ClientId : ''
            }
    
        default:
            return state;
    }
}


export default updateLoginData;