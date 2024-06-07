import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './shared/main-header/main-header.component';
import { MainBodyComponent } from './main-body/main-body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainHeaderComponent, MainBodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  valChildComp: string | any
 
  receiveMessage(message: string) {
    this.valChildComp = message;
  }
}
