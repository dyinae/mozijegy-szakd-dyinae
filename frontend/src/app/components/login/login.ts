import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';      // ezt használjuk névként
  jelszo = '';
  hiba = '';
  toltesAlatt = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.toltesAlatt = true;
    this.hiba = '';

    this.authService.login({
      nev: this.email,    // email változó tartalmazza a nevet
      jelszo: this.jelszo
    }).subscribe({
      next: (data) => {
        this.authService.tokenMentese(data.token);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.hiba = 'Hibás név vagy jelszó!';
        this.toltesAlatt = false;
      }
    });
  }
}