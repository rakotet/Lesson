import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { TestInput1Component } from './test-input1/test-input1.component';
import { TestInput2Component } from './test-input2/test-input2.component';
import { SendMessegeComponentService } from './shared/send-messege-component.service';
import { TestInput3Component } from './test-input3/test-input3.component';
import { TestInput4Component } from './test-input4/test-input4.component';
import { SendMessegeSubscriptionService } from './shared/send-messege-subscription.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainHeaderComponent, MainBodyComponent, TestInput1Component, TestInput2Component, TestInput3Component, TestInput4Component],
  providers: [SendMessegeComponentService, SendMessegeSubscriptionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  valChildComp: string | any
 
  receiveMessage(message: string) {
    this.valChildComp = message;
  }
}
