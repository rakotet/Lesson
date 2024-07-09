import { Component } from '@angular/core';
import { SendLocalStoreService } from '../../shared/send-local-store.service';
import { arrToDay } from '../../shared/arrInterface';
import { toDayDate } from '../../shared/allFunctions';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {

  constructor(private sendLocalStoreService: SendLocalStoreService) {}

  arrTask: Array<arrToDay> = []

  ngOnInit() {
    this.arrTask = this.updateArrTask()
  }

  updateArrTask() {
    return (this.sendLocalStoreService.getData()).map((item: any) => {
      if((new Date(toDayDate()).getTime()) > (new Date(item.taskDate).getTime())) return item
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
