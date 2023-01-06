import React, { useEffect, useMemo, useState }  from 'react'
import { collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import db from '../Firebase/firebase'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { getLTPData } from '../AngelAPI/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { AlertUpdate } from '../Redux/action';
import notification from './Notifier/notifier';



export default function DataTable() {
  const [Stock, setStock] = useState([])
  const [updatedStockDetails, setUpdatedStockDetails] = useState([])
  const [open, setOpen] = useState(false);
  const [deleteStockId, setDeleteStockId] = useState('')
  const [deleteStockName, setDeleteStockName] = useState("")
  const [selectedStockDataForUpdateID, setSelectedStockDataForUpdateID] = useState("")
  const [selectedStockDataForUpdateTradingSymbol, setSelectedStockDataForUpdateTradingSymbol] = useState("")
  const [selectedStockDataForUpdateSymbolToken, setSelectedStockDataForUpdateSymbolToken] = useState("")
  const [selectedStockDataForUpdateExchange, setSelectedStockDataForUpdateExchange] = useState("")
  const [selectedStockDataForUpdatePosition, setSelectedStockDataForUpdatePosition] = useState("")
  const [selectedStockDataForUpdateTarget, setSelectedStockDataForUpdateTarget] = useState("")
  const [updateTargetValue, setUpdateTargetValue] = useState("")
  const [updateDialogShow, setUpdateDialogShow] = useState(false)
  const dispatch =useDispatch()
  const myLoginState = useSelector((state)=>state.updateLoginData)
    
  useEffect(() => {
      const unsubscribe = onSnapshot(collection(db,'stock'), snapshot =>{
        setStock(snapshot.docs.map(doc=>({
          data: doc.data(),
          id:doc.id,
        })))
      } )
      return () => {
        unsubscribe() 
      }
    }, []) 

    useMemo(() => updateArray(Stock), [Stock])

  async function updateArray(inputArray) {
    console.log("updateArray");
    console.log(inputArray);
    if(inputArray !== []){
      for(let i=0; i<inputArray.length ; i++){
        const LTPData = await getLTPData(myLoginState.jwtToken, myLoginState.refreshToken , myLoginState.ClientId , myLoginState.feedToken, inputArray[i].data.exchange , inputArray[i].data.tradingsymbol , inputArray[i].data.symboltoken )
        const ranking = inputArray[i].data.target - LTPData
        var positiveRanking=null
        if(ranking<0){
          positiveRanking= ranking * (-1)
        }
        else{
          positiveRanking=ranking
        }
        const persentage = (positiveRanking * 100 ) / LTPData;
        inputArray[i].data["persentage"] = persentage.toFixed(2)
        inputArray[i].data["ltp"]=LTPData
        inputArray[i].data["ranking"] = positiveRanking.toFixed(2)

        //Notification section
        
        // if(persentage< 5){
        //   notification(inputArray[i].data)
        // }
      }
    console.log(inputArray);
    setUpdatedStockDetails(inputArray)
    
    }
    
      
    }

    async function deleteStock() {
      const docRef = await doc(db, 'stock' , deleteStockId)
      await deleteDoc(docRef).then((res)=>{
        console.log("Stock Deleted");
      })
      .catch((err)=>{
        console.log(err.message); 
      })
      setOpen(false);
    }

    function deleteButton( ID, Name ) {
      setDeleteStockId(ID)
      setDeleteStockName(Name)
      setOpen(true);
    };

    async function updateTarget(id, tradingsymbol, symboltoken, exchange, position, target) {
      await setSelectedStockDataForUpdateID(id)
      await setSelectedStockDataForUpdateTradingSymbol(tradingsymbol)
      await setSelectedStockDataForUpdateSymbolToken(symboltoken)
      await setSelectedStockDataForUpdateExchange(exchange)
      await setSelectedStockDataForUpdatePosition(position)
      await setSelectedStockDataForUpdateTarget(target)
      await setUpdateDialogShow(true)
      
    }
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleupdateDialogShow =()=>{
      setUpdateDialogShow(false)
    }

    const handleTargetUpdate = async () =>{
      console.log("handleTargetUpdate");
      if(updateTargetValue === '' & selectedStockDataForUpdateID === ''){
       dispatch(AlertUpdate("error","Stock Update Unsuccessful",`Please Enter Details Currectly`))
        return
      }
      else{
        const docRef = await doc(db , 'stock' , selectedStockDataForUpdateID)
        await updateDoc(docRef , {target : updateTargetValue })
        .then((response)=>{
          dispatch(AlertUpdate("success","Stock Update Successful",`${selectedStockDataForUpdateTradingSymbol} Updated. New Target - ${updateTargetValue}`))
        })
        .catch((err)=>{
          dispatch(AlertUpdate("error","Stock Update Unsuccessful",`Please Enter Details Currectly`))
        })
        setUpdateDialogShow(false)
      }
    }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Stock Symbol</TableCell>
              <TableCell align="right">Symbol Token</TableCell>
              <TableCell align="right">Exchange</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Target</TableCell>
              <TableCell align="right">LTP</TableCell>
              <TableCell align="right">Ranking</TableCell>
              <TableCell align="right">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {updatedStockDetails.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } , color  :'#ffffff' }}
                bgcolor ={row.data.persentage < 5 ? `success.main`: `error.main` }
              >
                <TableCell component="th" scope="row" sx={{color  :'#ffffff'}} >
                  {row.data.tradingsymbol}
                </TableCell>
                <TableCell align="right" sx={{color  :'#ffffff'}}  >{row.data.symboltoken}</TableCell>
                <TableCell align="right" sx={{color  :'#ffffff'}} >{row.data.exchange}</TableCell>
                <TableCell align="right" sx={{color  :'#ffffff'}} >{row.data.position}</TableCell>
                <TableCell align="right" sx={{color  :'#ffffff'}} >{row.data.target}</TableCell>
                <TableCell align="right" sx={{color  :'#ffffff'}} >{row.data.ltp}</TableCell>
                <TableCell align="right" sx={{color  :'#ffffff'}} >{row.data.ranking} <br/> ({row.data.persentage} %)</TableCell>
                <TableCell align="right" >
                  <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={()=> deleteButton(row.id , row.data.name)} >Delete</Button>
                  <Button variant="contained" color="secondary" startIcon={<UpdateIcon />} onClick={()=> updateTarget(row.id, row.data.tradingsymbol, row.data.symboltoken, row.data.exchange, row.data.position, row.data.target)} >Update</Button> 
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Stock Details"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do You Want To Delete {deleteStockName} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={()=> deleteStock()} autoFocus>
              Agree
            </Button>
          </DialogActions>
      </Dialog>

      <Dialog open={updateDialogShow} onClose={handleupdateDialogShow}>
        <DialogTitle>Update Target</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <Grid container spacing={2}>
              <Grid xs={4} item={true} className="inputField">
                  <TextField fullWidth={true}   label="Stock Name" variant="outlined" value={selectedStockDataForUpdateTradingSymbol} contentEditable={false} disabled />
              </Grid>
              <Grid xs={4} item={true} className="inputField">
                  <TextField fullWidth={true}   label="symbol Token" variant="outlined" value={selectedStockDataForUpdateSymbolToken} contentEditable={false} disabled />
              </Grid>
              <Grid xs={4} item={true} className="inputField">
                  <TextField fullWidth={true}   label="Exchange" variant="outlined" value={selectedStockDataForUpdateExchange} contentEditable={false} disabled />
              </Grid>
              <Grid xs={6} item={true} className="inputField">
                  <TextField fullWidth={true}   label="Position Type" variant="outlined" value={selectedStockDataForUpdatePosition} contentEditable={false} disabled />
              </Grid>
              <Grid xs={6} item={true} className="inputField">
                  <TextField fullWidth={true}   label="Old Target" variant="outlined" value={selectedStockDataForUpdateTarget} contentEditable={false} disabled/>
              </Grid>
            </Grid>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Target"
            type='number'
            fullWidth
            variant="standard"
            onChange={(value)=> setUpdateTargetValue(value.target.value)}
            value={updateTargetValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleupdateDialogShow}>Cancel</Button>
          <Button onClick={handleTargetUpdate}>Update</Button>
        </DialogActions>
      </Dialog>


    </>
  );
}
