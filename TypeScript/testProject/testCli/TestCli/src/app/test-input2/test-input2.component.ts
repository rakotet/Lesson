import { Component, OnInit  } from '@angular/core';
import { SendMessegeComponentService } from '../shared/send-messege-component.service';

@Component({
  selector: 'app-test-input2',
  standalone: true,
  imports: [],
  templateUrl: './test-input2.component.html',
  styleUrl: './test-input2.component.css'
})
export class TestInput2Component implements OnInit {
  receivedData: string;

  constructor
  (
    private sendMessegeComponentService: SendMessegeComponentService,
  ) 
  {
    this.receivedData = this.sendMessegeComponentService.getData();
  }

  ngOnInit() {
  
  }
    
  editComp() {
    this.receivedData = this.sendMessegeComponentService.getData();
  }
}
