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
      editDisp: 'Редактирование диспетчера',
      editGroup: 'Редактирование предприятие',
      addAuto: 'Добавить автотранспорт',
      autoCard: 'Карточка автотранспорта',
      editAuto: 'Редактирование автотранспорта',
      addApplications: 'Создать заявку',
      addMyTemplates: 'Создать шаблон',
      addMyApplications: 'Создать заявку',
      applicationsCard: 'Карточка заявки',
      myApplicationsCard: 'Карточка заявки',
      editApplications: 'Редактирование заявки',
      editMyApplications: 'Редактирование заявки',
      editMyTemplates: 'Редактирование шаблона'
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
      editDisp: 'editDisp',
      editGroup: 'editGroup',
      addAuto: 'addAuto',
      autoCard: 'autoCard',
      editAuto: 'editAuto',
      addApplications: 'addApplications',
      addMyApplications: 'addMyApplications',
      addMyTemplates: 'addMyTemplates',
      applicationsCard: 'applicationsCard',
      myApplicationsCard: 'myApplicationsCard',
      editApplications: 'editApplications',
      editMyApplications: 'editMyApplications',
      editMyTemplates: 'editMyTemplates'
    },
    roleUsers: {
      admin: 1,
      disp: 2,
      user: 3,
      sa: 0
    },
    actionLkData: {
      getDispData: 'getDispData',
      getGroupData: 'getGroupData',
      getAutoData: 'getAutoData',
      getApplicationsData: 'getApplicationsData',
      getMyApplicationsData: 'getMyApplicationsData',
      getMyTemplates: 'getMyTemplates',
      getAssignACar: 'getAssignACar'
    },
    selectSubdivision: [],
    dispSelectOne: [],
    dispSelectTwo: ['', []],
    updateLeftContent: '',
    assignAcar: false,
    cancelApplications: false,
    cancelApplicationsObj: {},
    applicationsToassignAcar: {date: {dateOfApplication: '', submissionTime: '', timeOfUseOfTransport: ''}},
    assignAcarClickAuto: {driver: '', telephone: '', marc: '', gossNumber: ''},
    wrapperContentCentrUpdate: '',
    noticeOfApplicationData: false,

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
    },
    setAssignAcar(state, data) {
      state.assignAcar = data.payload
    },
    setCancelApplications(state, data) {
      state.cancelApplications = data.payload
    },
    setCancelApplicationsObj(state, data) {
      state.cancelApplicationsObj = data.payload
    },
    setApplicationsToassignAcar(state, data) {
      state.applicationsToassignAcar = data.payload
    },
    setAssignAcarClickAuto(state, data) {
      state.assignAcarClickAuto = data.payload
    },
    setWrapperContentCentrUpdate(state, data) {
      state.wrapperContentCentrUpdate = data.payload
    },
    setNoticeOfApplicationData(state, data) {
      state.noticeOfApplicationData = data.payload
    },
  },
})

export const {setWrapperContentCentrUpdate, setDataStore, setActiveRow, setSelectSubdivision, setDispSelectOne, setDispSelectTwo, setUpdateLeftContent, setAssignAcar, setApplicationsToassignAcar, setAssignAcarClickAuto, setCancelApplications, setCancelApplicationsObj, setNoticeOfApplicationData} = dataSlice.actions

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
export const assignAcarData = state => state.dataStore.assignAcar
export const cancelApplicationsData = state => state.dataStore.cancelApplications
export const cancelApplicationsObj = state => state.dataStore.cancelApplicationsObj
export const applicationsToassignAcarData = state => state.dataStore.applicationsToassignAcar
export const assignAcarClickAutoData = state => state.dataStore.assignAcarClickAuto
export const wrapperContentCentrUpdateData = state => state.dataStore.wrapperContentCentrUpdate
export const noticeOfApplication = state => state.dataStore.noticeOfApplicationData

export default dataSlice.reducer