import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = '/api/filmek';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Auth header generálása
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // Összes film lekérése (publikus)
  getFilmek(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Egy film lekérése (publikus)
  getFilmById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Film létrehozása (admin)
  createFilm(film: any): Observable<any> {
    return this.http.post(this.apiUrl, film, {
      headers: this.getHeaders()
    });
  }

  // Film módosítása (admin)
  updateFilm(id: string, film: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, film, {
      headers: this.getHeaders()
    });
  }

  // Film törlése (admin)
  deleteFilm(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }
}
