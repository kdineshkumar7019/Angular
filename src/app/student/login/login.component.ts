import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
declare var google: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  loginData = {
    email: '',
    password: ''
  };


  alertMessage = '';
  alertType: 'success' | 'error' | '' = '';
  isLoading = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient
  ) { }

  login() {
    this.isLoading = true;
    this.alertMessage = '';

    this.loginService.login(this.loginData).subscribe({
      next: () => {
        this.alertType = 'success';
        this.alertMessage = 'Login successful!';
        setTimeout(() => {
          this.router.navigate(['/layout']);
        }, 1000);
      },
      error: (err) => {
        this.alertType = 'error';
        this.alertMessage = err?.error || 'Invalid email or password';
        this.isLoading = false;
      }
    });
  }
 

 ngOnInit() {
  google.accounts.id.initialize({
    client_id: '161660841508-cmblb7emfmjl6g0d2mhceu71e7fhiep4.apps.googleusercontent.com',
    callback: this.handleGoogleCredential.bind(this)
  });

  google.accounts.id.renderButton(
    document.getElementById("googleBtn"),
    { theme: "outline", size: "large" }
  );
}

handleGoogleCredential(response: any) {
  console.log(response.credential);

  this.http.post<any>('https://localhost:7130/api/auth/google', {
    idtoken: response.credential
  }).subscribe(res => {
    console.log(res);
    this.router.navigate(['/layout']);
  });
}
}




