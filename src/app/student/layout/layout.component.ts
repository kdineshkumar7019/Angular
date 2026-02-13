import { Component } from '@angular/core';
import { StudentComponent } from '../student.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [StudentComponent,FormsModule,CommonModule,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
   constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}



