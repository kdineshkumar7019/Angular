import { Routes } from '@angular/router';
import { LoginComponent } from './student/login/login.component';
import { RegisterComponent } from './student/register/register.component';
import { LayoutComponent } from './student/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'layout', component: LayoutComponent }
];
