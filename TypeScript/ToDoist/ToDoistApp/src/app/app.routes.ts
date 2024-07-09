import { Routes } from '@angular/router';
import { NotFoundComponentComponent } from './main/not-found-component/not-found-component.component';
import { AddTaskComponent } from './main/add-task/add-task.component';
import { TodayTaskComponent } from './main/today-task/today-task.component';
import { UpcomingTaskComponent } from './main/upcoming-task/upcoming-task.component';
import { ArchiveComponent } from './main/archive/archive.component';
import { EditTaskComponent } from './main/edit-task/edit-task.component'

export const routes: Routes = [
  { path: "", component: AddTaskComponent},
  { path: "today", component: TodayTaskComponent},
  { path: "upcoming", component: UpcomingTaskComponent},
  { path: "archive", component: ArchiveComponent},
  { path: "editTask", component: EditTaskComponent},
  { path: "**", component: NotFoundComponentComponent }
];
