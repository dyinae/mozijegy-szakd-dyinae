import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { HomeComponent } from './components/home/home';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { FilmekComponent } from './components/filmek/filmek';
import { VetitesekComponent } from './components/vetitesek/vetitesek';
import { FoglalasComponent } from './components/foglalas/foglalas';
import { AdminComponent } from './components/admin/admin';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'filmek', component: FilmekComponent },
  { path: 'vetitesek/:id', component: VetitesekComponent },
  { path: 'foglalas/:id', component: FoglalasComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '**', redirectTo: 'home' }
];