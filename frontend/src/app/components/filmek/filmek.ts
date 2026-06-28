import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-filmek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filmek.html',
  styleUrl: './filmek.css'
})
export class FilmekComponent implements OnInit {
  filmek: any[] = [];
  toltesAlatt = true;
  hiba = '';

  constructor(
    private filmService: FilmService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filmService.getFilmek().subscribe({
      next: (data) => {
        console.log('Filmek:', data);
        this.filmek = data;
        this.toltesAlatt = false;
        this.cdr.detectChanges();    // ← ez az új sor!
      },
      error: (err) => {
        console.log('Hiba:', err);
        this.hiba = 'Nem sikerült betölteni a filmeket!';
        this.toltesAlatt = false;
        this.cdr.detectChanges();    // ← ez az új sor!
      }
    });
  }

  vetitesekMegtekintese(id: string): void {
    this.router.navigate(['/vetitesek', id]);
  }
}