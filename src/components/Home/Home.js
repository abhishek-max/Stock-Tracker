import React, { useEffect } from 'react'
import './home.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import DataTable from '../DataTable';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutClient } from '../../AngelAPI/auth';
import { AlertUpdate, loadStockData, updateLogoutStore } from '../../Redux/action';
import ErrorType from '../../ErrorHandler/ErrorType';
import axios from 'axios';


export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myLoginState = useSelector((state)=>state.updateLoginData)
  const alertState = useSelector((state)=>state.alertData)
  // const stockData = useSelector((state)=>state.stockData)
  // console.log(myLoginState);
  // console.log(alertState);
  // console.log(stockData.data.data);

  useEffect(() => {
    const getData=async()=>{
      await axios.get('https://margincalculator.angelbroking.com/OpenAPI_File/files/OpenAPIScripMaster.json')
      .then((response)=>{
        dispatch(loadStockData(response.data))
        console.log("Stock data updata success");
      })
      .catch((e)=>
      console.log(e)
      )
    }
    getData()

  }, [])
  
  const addStock =()=>{
    console.log("Add Stock");
    navigate("/addStock")
  }

  const loginPage =()=>{
    console.log("Login");
    navigate("/login")
  }

  const logout = async () =>{
    console.log("Logout");
    const resultData = await logoutClient(myLoginState.jwtToken, myLoginState.refreshToken , myLoginState.ClientId )
    if(resultData.status){
      await dispatch(updateLogoutStore())
      await dispatch(AlertUpdate("success","Logout Success","Thank You"))
    }
    else{
      console.log(resultData.message);
    }
  }
  
  return (

    <div className='app'>

      <ErrorType type={alertState.type} code={alertState.title} message={alertState.message} />

      <h1>
        Stock Tracker
      </h1>

      <Container fluid>

        <Row>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={addStock} >Add Stock</Button>
          {
            myLoginState.status ?  <Button onClick={logout} >Logout</Button> : <Button onClick={loginPage} >Login</Button>  
          }
          
        </ButtonGroup>
        </Row> 
        <Row > 
          {

             myLoginState.status ? <DataTable /> : <> Login First</>
          }
        </Row> 
        
      </Container>
        
    </div>
  )
}
