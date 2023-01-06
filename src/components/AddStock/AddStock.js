import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './AddStock.css'
import { Autocomplete, Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { addDoc, collection } from 'firebase/firestore';
import db from '../../Firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AlertUpdate } from '../../Redux/action';


export default function AddStock() {
  const [stockName, setStockName] = useState()
  const [symboltoken, setSymboltoken] = useState("")
  const [position, setPosition] = useState('')
  const [exchange, setExchange] = useState('')
  const [target, setTarget] = useState()
  const [tradingsymbol, setTradingsymbol] = useState('')
  const [stockList, setStockList] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allInstrumentData = useSelector((state)=>state.stockData)
  useEffect(() => {
    getInstrumentListFromApi()
  }, [])


  async function getInstrumentListFromApi() {
      const selectdata=[]

      for(let i=0; i<allInstrumentData.data.data.length-1 ; i++){
        selectdata.push(allInstrumentData.data.data[i])
      }
      await setStockList(selectdata.map((option)=>
       `${(option.symbol)} ${(option.token)}`
      
      ));
  }
  
  async function updateState(value) {
    const selectData = allInstrumentData.data.data.find((item)=>`${(item.symbol)} ${(item.token)}`===value)
    setSymboltoken(selectData.token)
    setExchange(selectData.exch_seg)
    setTradingsymbol(selectData.symbol)
  }
  

  const backButton = ()=>{
    console.log("Back");
    navigate(-1)
  }

  const submitButton = async()=>{
    if(stockName!=='' & symboltoken !== '' & position!== '' & target !==''){
      const stockRef = await collection(db, 'stock')
      await addDoc(stockRef, {
        name : stockName,
        symboltoken : symboltoken,
        exchange,
        position,
        target,
        tradingsymbol,
      })
      .then(response=>{
        dispatch(AlertUpdate("success","Add Stock Successful",`${stockName} Added. Target - ${target}`))
        console.log("Stock update");
      })
      .catch(error =>{
        dispatch(AlertUpdate("error","Add Stock Unsuccessful",`Please Enter Details Currectly ${error.message}`))
        
        console.log(error.message);
      })
      navigate(-1)
    }
  }


  return (
    <div>
        <h1 className='formTitle' >Add Stock</h1>
        
        <div className='addStockBox'>
        <Box>
          <Grid container spacing={2}>
            <Grid xs={4} item={true} className="inputField">
            <Autocomplete
              disableClearable
              loading={true}
              value={stockName}
              autoComplete
              filterSelectedOptions
              onChange={async (event,val)=>{
                await setStockName(val)
                await updateState(val)
              }}
              options={
                stockList
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search input"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                  
              />
            )}
          /> 
            </Grid>
            <Grid xs={4} item={true} className="inputField">
              <TextField fullWidth={true}   label="symbol Token" variant="outlined" value={symboltoken} contentEditable={false} />
            </Grid>
            <Grid xs={4} item={true} className="inputField">
              <TextField fullWidth={true}   label="Exchange" variant="outlined" value={exchange} contentEditable={false} />
            </Grid>
            <Grid xs={4} item={true} className="inputField">
            <FormControl fullWidth={true} >
                <InputLabel id="demo-simple-select-label">Position Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={position}
                  label="Age"
                  onChange={(val)=>setPosition(val.target.value)}
                >
                  <MenuItem value={"Buy"}>Buy</MenuItem>
                  <MenuItem value={"Sell"}>Sell</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid item={true} xs={8} className="inputField">
            <TextField fullWidth={true}  label="Target" variant="outlined" onChange={(val)=>setTarget(val.target.value)} />
            </Grid>
          </Grid>
        </Box> 
        </div>

        <div className='buttonDiv'> 
          <ButtonGroup  variant="contained" fullWidth={true} >
              <Button color="error"  onClick={backButton} >Back</Button>
              <Button onClick={submitButton} >Submit</Button>
          </ButtonGroup >
        </div>
    </div>
  )
}
