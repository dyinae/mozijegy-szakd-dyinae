import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'    // az egész alkalmazásban elérhető
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  // Regisztráció
  register(adatok: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adatok);
  }

  // Bejelentkezés
  login(adatok: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, adatok);
  }

  // Token elmentése
  tokenMentese(token: string): void {
    localStorage.setItem('token', token);
  }

  // Token lekérése
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Bejelentkezett user adatai
  getUser(): any {
    const token = this.getToken();
    if (!token) return null;
    // JWT token középső része tartalmazza az adatokat
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  // Admin-e a user?
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.szerep === 'admin';
  }

  // Be van-e jelentkezve?
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Kijelentkezés
  logout(): void {
    localStorage.removeItem('token');
  }
}
