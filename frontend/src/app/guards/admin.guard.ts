import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Admin jogosultság szükséges
  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}