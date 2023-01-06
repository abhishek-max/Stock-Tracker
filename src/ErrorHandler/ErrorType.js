import { Alert, AlertTitle, IconButton, Stack } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { changeAlertState } from '../Redux/action';

export default function ErrorType({type,code,message}) {
    const dispatch = useDispatch()
    const closeAlert = () =>{
        dispatch(changeAlertState())
    }
    switch (type) {
        case "error":
            return(
                <div>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert 
                        variant="filled" 
                        severity="error"
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={closeAlert}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                    <AlertTitle>{code}</AlertTitle>
                        {message}
                    </Alert>
                    </Stack>
                </div>
            )
        
        case "success":
            return(
                <div>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert 
                        variant="filled" 
                        severity="success"
                        action={
                            <IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={closeAlert}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                    <AlertTitle>{code}</AlertTitle>
                        {message}
                    </Alert>
                    </Stack>
                </div>
            )
        
        default:
            return(
                <>
                </>
            )
    }
}
