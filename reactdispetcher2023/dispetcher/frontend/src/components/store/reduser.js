import {createSlice} from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'dataStore', // имя хранилища
  initialState: {
    userData: [{
      name: '',
      email: '',
      type: ''
    }],
    activeRow: '1',
  },
  reducers: { // набор ф-й для работы с данными хранилища, напрямую обращаться к этим данным не получится
    setDataStore(state, data) {
      state.userData = data.payload
    },
    setActiveRow(state, data) {
      state.activeRow = data.payload
    }
  },
})

export const {setDataStore, setActiveRow} = dataSlice.actions

export const userDataStore = state => state.dataStore.userData
export const activeRowStore = state => state.dataStore.activeRow

export default dataSlice.reducer