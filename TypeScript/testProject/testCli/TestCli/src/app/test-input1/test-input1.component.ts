import { Component } from '@angular/core';
import { SendMessegeComponentService } from '../shared/send-messege-component.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-input1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test-input1.component.html',
  styleUrl: './test-input1.component.css'
})
export class TestInput1Component {
  constructor(private sendMessegeComponentService: SendMessegeComponentService) {}

  valueInput: string = ''

  sendData() {
    this.sendMessegeComponentService.setData(this.valueInput);
  }
}
