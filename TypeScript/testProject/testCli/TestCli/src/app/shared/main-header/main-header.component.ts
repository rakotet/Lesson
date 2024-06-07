import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css'
})
export class MainHeaderComponent {
  pl = 'Введите текст'
  log = ''

  @Output() messageEvent = new EventEmitter<string>();

  sendValue() {
    this.messageEvent.emit(`${this.log}`);
  }
}
