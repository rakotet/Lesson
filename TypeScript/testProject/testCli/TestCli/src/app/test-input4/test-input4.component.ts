import { Component, OnInit } from '@angular/core';
import { SendMessegeSubscriptionService } from '../shared/send-messege-subscription.service';

@Component({
  selector: 'app-test-input4',
  standalone: true,
  imports: [],
  templateUrl: './test-input4.component.html',
  styleUrl: './test-input4.component.css'
})
export class TestInput4Component implements OnInit {
  test4ValInput = '1'

  constructor(private SendMessegeSubscriptionService: SendMessegeSubscriptionService) { }

  ngOnInit() {
    this.SendMessegeSubscriptionService.variable$.subscribe(value => {
      this.test4ValInput = value;
    });
  }
}
