import { Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/tas-list/task-list.component';
import { MainComponent } from './features/main/main/main.component';
import { LoginComponent } from './features/login/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AddTasksComponent } from './features/add-tasks/add-tasks/add-tasks.component';
import { RegisterComponent } from './features/register/register/register.component';
import { loginguardGuard } from './guards/login/loginguard.guard';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'task-list', component: TaskListComponent, canActivate:[authGuard] },
    { path: 'add-task', component: AddTasksComponent, canActivate:[authGuard] },
    { path: 'login', component: LoginComponent, canActivate:[loginguardGuard] },
    { path: 'register', component: RegisterComponent, canActivate:[loginguardGuard] }
];
