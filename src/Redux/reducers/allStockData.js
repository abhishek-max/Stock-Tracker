const initialState= {
    status:false,
    data:[],
}

const stockData=(state=initialState, action)=>{
    switch (action.type){
        case "LoadData":
            return{
                ...state,
                status:true,
                data:action.payload
            }
        default:
            return state;
    }
}

export default stockData;