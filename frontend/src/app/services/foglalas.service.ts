import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FoglalasService {
  private apiUrl = '/api/foglalasok';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Foglalás létrehozása (bejelentkezett user)
  createFoglalas(foglalas: any): Observable<any> {
    return this.http.post(this.apiUrl, foglalas, {
      headers: this.getHeaders()
    });
  }

  // Foglalás lemondása
  deleteFoglalas(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  // Összes foglalás (admin)
  getFoglalasok(): Observable<any> {
    return this.http.get(this.apiUrl, {
      headers: this.getHeaders()
    });
  }
}
