import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VetitesService {
  private apiUrl = '/api/vetitesek';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Összes vetítés lekérése (publikus)
  getVetitesek(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Egy vetítés lekérése (publikus)
  getVetitesById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Vetítés létrehozása (admin)
  createVetites(vetites: any): Observable<any> {
    return this.http.post(this.apiUrl, vetites, {
      headers: this.getHeaders()
    });
  }

  // Vetítés törlése (admin)
  deleteVetites(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
