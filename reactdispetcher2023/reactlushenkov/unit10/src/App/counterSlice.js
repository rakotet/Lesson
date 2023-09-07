import {createSlice} from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter', // имя хранилища
  initialState: {
    value: 0,
    text: 'privet'
  },
  reducers: { // набор ф-й для работы с данными хранилища, напрямую обращаться к этим данным не получится
    increment: state => {
      state.value += 15
    },
    showConsole: state => {
      state.text = 'hello'
    }
  },
})

export const {increment, showConsole} = counterSlice.actions

export const selectCount = state => state.counter.value
export const selectText = state => state.counter.text

export default counterSlice.reducer