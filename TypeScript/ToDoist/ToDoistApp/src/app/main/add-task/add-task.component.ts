import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SendLocalStoreService } from '../../shared/send-local-store.service'
import { toDayDate } from '../../shared/allFunctions';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})

export class AddTaskComponent implements OnInit {
  taskName: string = ''
  localDate: string = ''
  taskDescription: string = ''
  placeholder = 'Введите текст'

  constructor(private sendLocalStoreService: SendLocalStoreService) {
    
  }

  ngOnInit() {
    this.localDate = toDayDate()
  }

  onSubmit(form: NgForm) {
    this.sendLocalStoreService.setData({...form.form.value, job: false})
    alert('Задача добавлена')
    this.taskName = ''
    this.taskDescription = ''
  }
}
