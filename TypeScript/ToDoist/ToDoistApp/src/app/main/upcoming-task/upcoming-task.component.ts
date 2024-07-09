import { Component } from '@angular/core';
import { SendLocalStoreService } from '../../shared/send-local-store.service';
import { arrToDay } from '../../shared/arrInterface';
import { toDayDate } from '../../shared/allFunctions';
import { Router} from "@angular/router";

@Component({
  selector: 'app-upcoming-task',
  standalone: true,
  imports: [],
  templateUrl: './upcoming-task.component.html',
  styleUrl: './upcoming-task.component.css'
})
export class UpcomingTaskComponent {
  
  constructor(private sendLocalStoreService: SendLocalStoreService, private router: Router) {}

  arrTask: Array<arrToDay> = []

  ngOnInit() {
    this.arrTask = this.updateArrTask()
  }

  updateArrTask() {
    return (this.sendLocalStoreService.getData()).map((item: any) => {
      if((new Date(toDayDate()).getTime()) < (new Date(item.taskDate).getTime())) return item
    })
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
