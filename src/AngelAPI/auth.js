import axios from "axios";
import { SmartAPI  } from "smartapi-javascript/lib";

export async function loginClient (clientID, password, tOTP) {
    let smart_api = new SmartAPI({
        api_key: "NMYU27RG",
    });
    const result = await smart_api.generateSession(clientID, password, tOTP)
        .then(async (data)=>{
        if(data.status===true){
            const logData = {
                "data": data.data,
                "status": true
            }
            return logData
        }
        else{
            console.log("Login Unsuccessfull");
            const logData = {
                "errorcode": data.errorcode,
                "message": data.message,
                "status": false
            }
            return logData
        }
        }) 
        .catch(ex=>{
        console.log("User Login Fail");
        console.log(ex);
            
        })
    return result;
}

export async function logoutClient (jwtToken,refreshToken, clientID) {
    console.log(jwtToken);
    console.log(refreshToken);
    console.log(clientID);
    let smart_api = new SmartAPI({
        api_key: "NMYU27RG",
        access_token: jwtToken,
        refresh_token: refreshToken
    });
    const result = await smart_api.logout(clientID)
        .then((res)=>{
            console.log("User Logout Pass");
            console.log(res);
            return res
        })
        .catch(ex=>{
            console.log("User Logout Fail");
            console.log(ex);
        })
    return result;
}

export async function getLTPData (jwtToken,refreshToken, clientID,feedToken, exchange, tradingsymbol, symboltoken) {

    var data = JSON.stringify({
        "exchange": exchange,
        "tradingsymbol": tradingsymbol,
        "symboltoken": symboltoken

    });

    var config = {
    method: 'post',
    url: 'https://apiconnect.angelbroking.com/order-service/rest/secure/angelbroking/order/v1/getLtpData',
    headers: { 
        'Authorization': `Bearer ${jwtToken}`, 
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
        'X-UserType': 'USER', 
        'X-SourceID': 'WEB',
        'X-ClientLocalIP': '192.168.43.121', 
        'X-ClientPublicIP': '192.168.43.121', 
        'X-MACAddress': '04-D3-B0-6F-BC-9C', 
        'X-PrivateKey': 'NMYU27RG'
    },
    data : data
    };

    let Ltp = await axios(config)
    .then(async function (response) {
        let redultData = await response.data.data
        return redultData.ltp
    })
    .catch(function (error) {
    console.log(error);
    });
    return Ltp
}
