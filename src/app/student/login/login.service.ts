import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://localhost:7130/api/auth/login';
  private TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ================= LOGIN =================
  login(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  // ================= SAVE TOKEN =================
  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // ================= GET TOKEN =================
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // ================= LOGOUT =================
  logout() {
    // Clear stored auth data
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.clear(); // optional (remove if you store other data)

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  // ================= LOGIN STATUS =================
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
 googleLogin(idToken: string) {
  return this.http.post('https://localhost:7130/api/auth/google', {
  idToken: idToken
})
}
}
