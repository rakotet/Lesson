import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SendLocalStoreService } from '../../shared/send-local-store.service'

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
    let date = ((new Date).toLocaleDateString()).split('.')
    this.localDate = `${date[2]}-${date[1]}-${date[0]}`
  }

  onSubmit(form: NgForm) {
    this.sendLocalStoreService.setData(form.form.value)
    alert('Задача добавлена')
    this.taskName = ''
    this.taskDescription = ''
  }
}
