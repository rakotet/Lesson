import {createSlice} from '@reduxjs/toolkit'

const mytextSlice = createSlice({
  name: 'mytext', // имя хранилища
  initialState: {
    text: 'mytext data'
  },
  reducers: { // набор ф-й для работы с данными хранилища, напрямую обращаться к этим данным не получится
    increment: state => {
      state.text += '!'
    },
    showConsole: state => {
      state.text = 'hello its a mytextslice'
    }
  },
})

export const {increment, showConsole} = mytextSlice.actions

export const selectMyText1 = state => state.mytext.text

export default mytextSlice.reducer