import { Routes } from '@angular/router';
import { NotFoundComponentComponent } from './main/not-found-component/not-found-component.component';
import { AddTaskComponent } from './main/add-task/add-task.component';
import { TodayTaskComponent } from './main/today-task/today-task.component';
import { UpcomingTaskComponent } from './main/upcoming-task/upcoming-task.component';

export const routes: Routes = [
  { path: "", component: AddTaskComponent},
  { path: "today", component: TodayTaskComponent},
  { path: "upcoming", component: UpcomingTaskComponent},
  { path: "**", component: NotFoundComponentComponent }
];
