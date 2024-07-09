import { Component, OnInit } from '@angular/core';
import { SendLocalStoreService } from '../../shared/send-local-store.service';
import { arrToDay } from '../../shared/arrInterface';
import { toDayDate } from '../../shared/allFunctions';
import { Router} from "@angular/router";

@Component({
  selector: 'app-today-task',
  standalone: true,
  imports: [],
  templateUrl: './today-task.component.html',
  styleUrl: './today-task.component.css'
})

export class TodayTaskComponent implements OnInit  {

  constructor(private sendLocalStoreService: SendLocalStoreService, private router: Router) {}

  arrTask: Array<arrToDay> = []

  ngOnInit() {
    this.arrTask = this.updateArrTask()
  }

  updateArrTask() {
    return (this.sendLocalStoreService.getData()).map((item: any) => {
      if(toDayDate() == item.taskDate) return item
    })
  }

  toggleStatus(index: number) {
    this.sendLocalStoreService.editJob(index)
    this.arrTask = this.updateArrTask()
  }

  editTaskStatus(index: number) {
    let result = confirm("Отменить выполнение задачи?")
    if(result) {
      this.toggleStatus(index)
    }
  }

  removeTask(index: number) {
    let result = confirm("Удалить задачу?")
    if(result) {
      this.sendLocalStoreService.remove(index)
      this.arrTask = this.updateArrTask()
    }
  }

  editTask(item: arrToDay, index: number) {
    item.index = index
    this.sendLocalStoreService.editTask(item)
    this.router.navigate(["/editTask"]);
  }
}
