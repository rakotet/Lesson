import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './reduser'

export default configureStore({
  reducer: {
    dataStore: counterReducer, // хранилище
  }
})