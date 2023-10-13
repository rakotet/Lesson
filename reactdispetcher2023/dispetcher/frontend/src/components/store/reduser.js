import {createSlice} from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'dataStore', // имя хранилища
  initialState: {
    userData: {
      userName: '',
      email: '',
      type: ''
    },
    activeRow: '',
    nameRowData: {
      disp: 'Диспетчеры',
      group: 'Предприятия',
      auto: 'Автотранспорт',
      applications: 'Заявки',
      myApplications: 'Мои заявки',
      myTemplates: 'Мои шаблоны',
      admins: 'Администраторы',
      addDisp: 'Добавить диспетчера',
      addGroup: 'Добавить предприятие',
      companyCard: 'Карточка предприятия',
      dispCard: 'Карточка диспетчера',
      editDisp: 'Редактирование диспетчера'
    },
    activRightContent: {
      disp: 'disp',
      group: 'group',
      auto: 'auto',
      applications: 'applications',
      myApplications: 'myApplications',
      myTemplates: 'myTemplates',
      admins: 'admins',
      addDisp: 'addDisp',
      addGroup: 'addGroup',
      companyCard: 'companyCard',
      dispCard: 'dispCard',
      editDisp: 'editDisp'
    },
    roleUsers: {
      admin: 1,
      disp: 2,
      user: 3,
      sa: 0
    },
    actionLkData: {
      getDispData: 'getDispData',
      getGroupData: 'getGroupData'
    },
    selectSubdivision: [],
    dispSelectOne: [],
    dispSelectTwo: ['', []],
    updateLeftContent: ''

  },
  reducers: { // набор ф-й для работы с данными хранилища, напрямую обращаться к этим данным не получится
    setDataStore(state, data) {
      state.userData = data.payload
    },
    setActiveRow(state, data) {
      state.activeRow = data.payload
    },
    setSelectSubdivision(state, data) {
      state.selectSubdivision = data.payload
    },
    setDispSelectOne(state, data) {
      state.dispSelectOne = data.payload
    },
    setDispSelectTwo(state, data) {
      state.dispSelectTwo = data.payload
    }, 
    setUpdateLeftContent(state, data) {
      state.updateLeftContent = data.payload
    }
  },
})

export const {setDataStore, setActiveRow, setSelectSubdivision, setDispSelectOne, setDispSelectTwo, setUpdateLeftContent} = dataSlice.actions

export const userDataStore = state => state.dataStore.userData
export const activeRowStore = state => state.dataStore.activeRow
export const nameRowData = state => state.dataStore.nameRowData
export const activRightContent = state => state.dataStore.activRightContent
export const roleUsers = state => state.dataStore.roleUsers
export const actionLkData = state => state.dataStore.actionLkData
export const selectSubdivision = state => state.dataStore.selectSubdivision
export const dispSelectOne = state => state.dataStore.dispSelectOne
export const dispSelectTwo = state => state.dataStore.dispSelectTwo
export const updateLeftContent = state => state.dataStore.updateLeftContent

export default dataSlice.reducer