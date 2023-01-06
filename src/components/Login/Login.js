import { Button, ButtonGroup, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginClient } from '../../AngelAPI/auth'
import ErrorType from '../../ErrorHandler/ErrorType'
import { addLoginData, AlertUpdate } from '../../Redux/action'
import "./login.css"


export default function Login() {
    const [clientID, setClientID] = useState('')
    const [password, setPassword] = useState('')
    const [tOTP, setTOTP] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
  const alertState = useSelector((state)=>state.alertData)


    const backButton = ()=>{
      console.log("Back");
      navigate(-1)
    }

    const loginUser = async () =>{
      if(clientID!== '' & password!=='' & tOTP!=='' ){
        const Clientdata = await loginClient(clientID, password, tOTP)
        console.log(Clientdata)
        if(Clientdata.status){
         await dispatch(addLoginData(Clientdata.data,clientID))
         await dispatch(AlertUpdate("success","Login Success","Welcome"))
         navigate(-1)
        }
        else{
          await dispatch(AlertUpdate("error",Clientdata.errorcode,Clientdata.message))
         console.log(Clientdata.message);
        }
      }
        
    }
    


  return (
    <div className='container'>
      <ErrorType type={alertState.type} code={alertState.title} message={alertState.message} />
        <h1 className='formTitle' >Login</h1>
        
        <div className='addLoginBox'>  
          <Grid container spacing={1}>
            <Grid xs={12} item={true} className="inputField">
              <TextField fullWidth={true} required label="Client ID" variant="outlined" onChange={(val)=>setClientID(val.target.value)} />
            </Grid>
            <Grid xs={12} item={true} className="inputField">
              <TextField fullWidth={true} required type="password"  label="Password" variant="outlined" onChange={(val)=>setPassword(val.target.value)} />
            </Grid>
            <Grid xs={12} item={true} className="inputField">
              <TextField fullWidth={true} required type='number' label="TOTP" variant="outlined" onChange={(val)=>setTOTP(val.target.value)} />
            </Grid>
          </Grid>
        </div> 

        <div className='buttonDiv'> 
          <ButtonGroup  variant="contained" fullWidth={true} >
              <Button color="error"  onClick={backButton} >Back</Button>
              <Button onClick={loginUser} >Login</Button>
          </ButtonGroup >
        </div>
    </div>
  )
}
