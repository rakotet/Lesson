import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAppComponent } from './header-app/header-app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { SendLocalStoreService } from './shared/send-local-store.service';
import { constObj } from './shared/constObj';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderAppComponent, MainComponent, FooterComponent],
  providers: [SendLocalStoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  ngOnInit() {
    let tasksObj = localStorage.getItem(constObj.tasksObj)

    if(!tasksObj) localStorage.setItem(constObj.tasksObj, JSON.stringify([]));
  }
}
