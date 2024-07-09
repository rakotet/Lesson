import { Injectable } from '@angular/core';
import { constObj } from './constObj';
import { arrToDay } from './arrInterface';

@Injectable({
  providedIn: 'root'
})

export class SendLocalStoreService {
  constructor() { }

  item: arrToDay = {}

  getData() {
    const data: string | null = localStorage.getItem(constObj.tasksObj)
    if(data) return JSON.parse(data)
    return []
  }

  updateStorage(data: Array<arrToDay>) {
    localStorage.setItem(constObj.tasksObj, JSON.stringify(data));
  }

  getStorage() {
    const localObj: string | null = localStorage.getItem(constObj.tasksObj)
    if(localObj) {
      let localObjData: Array<arrToDay> = JSON.parse(localObj)
      return localObjData
    }

    return []
  }

  setData(data: arrToDay) {
    let localObjData = this.getStorage()

    if(localObjData) {
      localObjData.push(data)
      this.updateStorage(localObjData);
    }
  }

  editJob(index: number) {
    let localObjData = this.getStorage()

    if(localObjData) {
      localObjData[index] = {...localObjData[index], job: localObjData[index]['job'] ? false : true}
      this.updateStorage(localObjData);
    }
  }

  remove(index: number) {
    let localObjData = this.getStorage()

    if(localObjData) {
      delete localObjData[index]

      localObjData = localObjData.filter((item: any) => {
        if(item) return true
        return false
      })

      this.updateStorage(localObjData);
    }
  }

  editTask(item: arrToDay) {
    this.item = item
  }

  getItem() {
    return this.item
  }

  editTaskItem(item: arrToDay, index: number) {
    let localObjData = this.getStorage()

    if(localObjData) {
      localObjData[index] = item
      this.updateStorage(localObjData);
    }
  }
}
