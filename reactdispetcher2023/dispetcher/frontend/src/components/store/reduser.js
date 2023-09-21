import {createSlice} from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'dataStore', // имя хранилища
  initialState: {
    userData: [{
      name: '111',
      email: '111@mail.ru'
    }],
    text: 'privet'
  },
  reducers: { // набор ф-й для работы с данными хранилища, напрямую обращаться к этим данным не получится
    increment(state, data) {
      state.userData = data.payload
    },
    showConsole: state => {
      state.text = 'hello'
    }
  },
})

export const {increment, showConsole} = dataSlice.actions

export const userDataStore = state => state.dataStore.userData

export default dataSlice.reducer