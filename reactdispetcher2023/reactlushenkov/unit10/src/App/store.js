import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import myTextReducer from './mytextSlice'

export default configureStore({
  reducer: {
    counter: counterReducer, // это два хранилища которые мы создали и будем использовать
    mytext: myTextReducer
  }
})