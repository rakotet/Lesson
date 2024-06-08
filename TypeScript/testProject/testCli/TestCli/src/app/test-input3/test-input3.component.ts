import { Component } from '@angular/core';
import { SendMessegeSubscriptionService } from '../shared/send-messege-subscription.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-input3',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test-input3.component.html',
  styleUrl: './test-input3.component.css'
})
export class TestInput3Component {
  test3ValInput: string = ''
  
  constructor(private SendMessegeSubscriptionService: SendMessegeSubscriptionService) { }

  updateVariable() {
    this.SendMessegeSubscriptionService.updateData(this.test3ValInput);
  }
}
