import { Component, OnInit } from '@angular/core';
import { SendLocalStoreService } from '../../shared/send-local-store.service';
import { arrToDay } from '../../shared/arrInterface';
import { toDayDate } from '../../shared/allFunctions';

@Component({
  selector: 'app-today-task',
  standalone: true,
  imports: [],
  templateUrl: './today-task.component.html',
  styleUrl: './today-task.component.css'
})

export class TodayTaskComponent implements OnInit  {

  constructor(private sendLocalStoreService: SendLocalStoreService) {}

  arrTask: Array<arrToDay> = []

  toggleStatus(index: number) {
    this.sendLocalStoreService.editJob(index)
    this.arrTask = (this.sendLocalStoreService.getData()).filter((item: any) => {
      if(toDayDate() == item.taskDate) return true
      return false
    })
  }

  ngOnInit() {
    this.arrTask = (this.sendLocalStoreService.getData()).filter((item: any) => {
      if(toDayDate() == item.taskDate) return true
      return false
    })
  }
}
