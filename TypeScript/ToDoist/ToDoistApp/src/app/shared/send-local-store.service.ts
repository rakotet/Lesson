import { Injectable } from '@angular/core';
import { constObj } from './constObj';
import { arrToDay } from './arrInterface';

@Injectable({
  providedIn: 'root'
})

export class SendLocalStoreService {
  constructor() { }

  getData() {
    const data: string | null = localStorage.getItem(constObj.tasksObj)
    if(data) return JSON.parse(data)
    return []
  }

  setData(data: arrToDay) {
    const localObj: string | null = localStorage.getItem(constObj.tasksObj)
    if(localObj) {
      let localObjData: Array<arrToDay> = JSON.parse(localObj)
      localObjData.push(data)
      localStorage.setItem(constObj.tasksObj, JSON.stringify(localObjData));
    }
  }

  editJob(index: number) {
    const localObj: string | null = localStorage.getItem(constObj.tasksObj)
    if(localObj) {
      let localObjData: Array<arrToDay> = JSON.parse(localObj)

      localObjData[index] = {...localObjData[index], job: localObjData[index]['job'] ? false : true}

      localStorage.setItem(constObj.tasksObj, JSON.stringify(localObjData));
    }
  }
}
