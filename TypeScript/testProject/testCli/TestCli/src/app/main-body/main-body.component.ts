import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-body',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main-body.component.html',
  styleUrl: './main-body.component.css'
})
export class MainBodyComponent {
  _bodyVal: string = '';

  @Input()
    set bodyVal(age:string) {
        if(age == '1')
            this._bodyVal = 'yes';
        else if(age == '2')
            this._bodyVal = 'yes2';
        else
            this._bodyVal = age;
  }
  get bodyVal() { return this._bodyVal; }
}
