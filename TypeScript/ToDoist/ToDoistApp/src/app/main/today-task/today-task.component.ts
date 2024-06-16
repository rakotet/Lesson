import { Component, OnInit } from '@angular/core';
import { SendLocalStoreService } from '../../shared/send-local-store.service';

@Component({
  selector: 'app-today-task',
  standalone: true,
  imports: [],
  templateUrl: './today-task.component.html',
  styleUrl: './today-task.component.css'
})

export class TodayTaskComponent implements OnInit {

  constructor(private sendLocalStoreService: SendLocalStoreService) {}

  arrTask: Array<any> = []


  ngOnInit() {
    this.arrTask = this.sendLocalStoreService.getData()
    console.log(this.arrTask)
  }
}
