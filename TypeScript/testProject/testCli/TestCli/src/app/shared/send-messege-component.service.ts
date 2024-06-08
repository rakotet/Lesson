import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendMessegeComponentService {

  private data: any = '1';

  constructor() {}

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}
