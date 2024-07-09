import { Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/tas-list/task-list.component';
import { MainComponent } from './features/main/main/main.component';
import { LoginComponent } from './features/login/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'task-list', component: TaskListComponent, canActivate:[authGuard] },
    { path: 'login', component: LoginComponent },
];
