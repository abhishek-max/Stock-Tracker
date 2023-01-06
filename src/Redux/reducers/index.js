import updateLoginData from './angelLogin';
import alertData from './alert'
import stockData from './allStockData'

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    updateLoginData,
    alertData,
    stockData
})

export default rootReducer;