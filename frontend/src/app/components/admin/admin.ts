import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilmService } from '../../services/film.service';
import { VetitesService } from '../../services/vetites.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent implements OnInit {
  filmek: any[] = [];
  vetitesek: any[] = [];
  aktifTab = 'filmek';
  hiba = '';
  siker = '';

  ujFilm = {
    cim: '',
    leiras: '',
    mufaj: '',
    hosszPercben: 0,
    korhatar: 'mindenkinek'
  };

  ujVetites = {
    film: '',
    datum: '',
    terem: '',
    osszesUlohely: 50,
    jegyAr: 1800
  };

  constructor(
    private filmService: FilmService,
    private vetitesService: VetitesService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filmekBetoltese();
    this.vetitesekBetoltese();
  }

  filmekBetoltese(): void {
    this.filmService.getFilmek().subscribe({
      next: (data) => {
        this.filmek = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.hiba = 'Filmek betöltése sikertelen!';
        this.cdr.detectChanges();
      }
    });
  }

  vetitesekBetoltese(): void {
    this.vetitesService.getVetitesek().subscribe({
      next: (data) => {
        this.vetitesek = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.hiba = 'Vetítések betöltése sikertelen!';
        this.cdr.detectChanges();
      }
    });
  }

  filmHozzaadasa(): void {
    this.hiba = '';
    this.siker = '';

    this.filmService.createFilm(this.ujFilm).subscribe({
      next: () => {
        this.siker = 'Film sikeresen hozzáadva!';
        this.filmekBetoltese();
        this.ujFilm = {
          cim: '',
          leiras: '',
          mufaj: '',
          hosszPercben: 0,
          korhatar: 'mindenkinek'
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.hiba = err.error?.message || 'Film hozzáadása sikertelen!';
        this.cdr.detectChanges();
      }
    });
  }

  filmTorlese(id: string): void {
    if (!confirm('Biztosan törlöd a filmet?')) return;

    this.filmService.deleteFilm(id).subscribe({
      next: () => {
        this.siker = 'Film sikeresen törölve!';
        this.filmekBetoltese();
        this.cdr.detectChanges();
      },
      error: () => {
        this.hiba = 'Film törlése sikertelen!';
        this.cdr.detectChanges();
      }
    });
  }

  vetitesHozzaadasa(): void {
    this.hiba = '';
    this.siker = '';

    this.vetitesService.createVetites(this.ujVetites).subscribe({
      next: () => {
        this.siker = 'Vetítés sikeresen hozzáadva!';
        this.vetitesekBetoltese();
        this.ujVetites = {
          film: '',
          datum: '',
          terem: '',
          osszesUlohely: 50,
          jegyAr: 1800
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.hiba = err.error?.message || 'Vetítés hozzáadása sikertelen!';
        this.cdr.detectChanges();
      }
    });
  }

  vetitesTorlese(id: string): void {
    if (!confirm('Biztosan törlöd a vetítést?')) return;

    this.vetitesService.deleteVetites(id).subscribe({
      next: () => {
        this.siker = 'Vetítés sikeresen törölve!';
        this.vetitesekBetoltese();
        this.cdr.detectChanges();
      },
      error: () => {
        this.hiba = 'Vetítés törlése sikertelen!';
        this.cdr.detectChanges();
      }
    });
  }

  tabValtas(tab: string): void {
    this.aktifTab = tab;
    this.hiba = '';
    this.siker = '';
    this.cdr.detectChanges();
  }
}