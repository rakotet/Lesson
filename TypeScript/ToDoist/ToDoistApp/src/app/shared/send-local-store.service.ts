import { Injectable } from '@angular/core';
import { constObj } from './constObj';

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

  setData(data: object) {
    const localObj: string | null = localStorage.getItem(constObj.tasksObj)
    if(localObj) {
      let localObjData: Array<object> = JSON.parse(localObj)
      localObjData.push(data)
      localStorage.setItem(constObj.tasksObj, JSON.stringify(localObjData));
    }
  }
}
