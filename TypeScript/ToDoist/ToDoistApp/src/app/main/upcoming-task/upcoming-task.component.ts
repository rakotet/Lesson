import { Component } from '@angular/core';
import { SendLocalStoreService } from '../../shared/send-local-store.service';
import { arrToDay } from '../../shared/arrInterface';
import { toDayDate } from '../../shared/allFunctions';

@Component({
  selector: 'app-upcoming-task',
  standalone: true,
  imports: [],
  templateUrl: './upcoming-task.component.html',
  styleUrl: './upcoming-task.component.css'
})
export class UpcomingTaskComponent {
  
  constructor(private sendLocalStoreService: SendLocalStoreService) {}

  arrTask: Array<arrToDay> = []

  ngOnInit() {
    this.arrTask = this.updateArrTask()
  }

  updateArrTask() {
    return (this.sendLocalStoreService.getData()).map((item: any) => {
      if(toDayDate() != item.taskDate) return item
    })
  }

  removeTask(index: number) {
    let result = confirm("Удалить задачу?")
    if(result) {
      this.sendLocalStoreService.remove(index)
      this.arrTask = this.updateArrTask()
    }
  }
}
