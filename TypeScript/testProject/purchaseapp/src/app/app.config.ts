import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig } from "@angular/core";
 
// компоненты, которые сопоставляются с маршрутами
import {HomeComponent} from "./home.component";
import {AboutComponent} from "./about.component";
import {NotFoundComponent} from "./not-found.component";
 
// определение маршрутов
const appRoutes: Routes =[
    { path: "", component: HomeComponent},
    { path: "about", component: AboutComponent},
    { path: "**", component: NotFoundComponent }
];
 
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes)]
};