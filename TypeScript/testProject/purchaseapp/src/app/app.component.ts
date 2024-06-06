import { Component} from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive} from "@angular/router";
 
@Component({
    selector: "my-app",
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    styles: `a {padding: 5px;}
            .active {color:red;}`,
    template: `<div>
                <nav>
                    <a routerLink="" routerLinkActive="active"
                      [routerLinkActiveOptions]="{exact:true}">Главная</a>
                    <a routerLink="/about" routerLinkActive="active">О сайте</a>
                </nav>
                <router-outlet></router-outlet>
               </div>`,
})
export class AppComponent {}