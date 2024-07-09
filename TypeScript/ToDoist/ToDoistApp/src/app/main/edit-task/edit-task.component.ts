import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SendLocalStoreService } from '../../shared/send-local-store.service'
import { toDayDate } from '../../shared/allFunctions';
import { arrToDay } from '../../shared/arrInterface';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {
  taskName: string = ''
  localDate: string = ''
  localDateMin: string = ''
  taskDescription: string = ''
  placeholder = 'Введите текст'
  item: any = {}

  constructor(private sendLocalStoreService: SendLocalStoreService) {}

  ngOnInit() {
    this.item = this.sendLocalStoreService.getItem()
    this.localDateMin = toDayDate()
    this.taskName = this.item.taskName
    this.localDate = this.item.taskDate
    this.taskDescription = this.item.taskDescription
  }

  onSubmit(form: NgForm) {
    this.sendLocalStoreService.editTaskItem({...form.form.value, job: this.item.job}, this.item.index)
    alert('Задача изменена')
  }
}
