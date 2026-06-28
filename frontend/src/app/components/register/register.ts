import { Component, ChangeDetectorRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  nev = '';
  jelszo = '';
  szuletesiDatum = '';
  hiba = '';
  toltesAlatt = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  register(): void {
    console.log('Register gomb megnyomva!');
    console.log('Adatok:', this.nev, this.jelszo, this.szuletesiDatum);
    this.toltesAlatt = true;
    this.hiba = '';
    this.cdr.detectChanges();

    this.authService.register({
      nev: this.nev,
      jelszo: this.jelszo,
      szuletesiDatum: this.szuletesiDatum
    }).subscribe({
      next: (data) => {
        console.log('Siker:', data);
        this.authService.tokenMentese(data.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log('Hiba:', err);
        this.hiba = err.error?.message || 'Sikertelen regisztráció!';
        this.toltesAlatt = false;
        this.cdr.detectChanges();
      }
    });
  }
}