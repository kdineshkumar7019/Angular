import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7130/api/auth/register';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(this.apiUrl, data);
  }
}
