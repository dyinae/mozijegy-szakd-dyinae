import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VetitesService } from '../../services/vetites.service';
import { FoglalasService } from '../../services/foglalas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-foglalas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './foglalas.html',
  styleUrl: './foglalas.css'
})
export class FoglalasComponent implements OnInit {
  vetites: any = null;
  foglalasok: any[] = [];
  toltesAlatt = true;
  hiba = '';
  siker = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vetitesService: VetitesService,
    private foglalasService: FoglalasService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.vetitesService.getVetitesById(id).subscribe({
      next: (data) => {
        this.vetites = data;
        this.toltesAlatt = false;
      },
      error: () => {
        this.hiba = 'Vetítés nem található!';
        this.toltesAlatt = false;
      }
    });

    // Saját foglalások lekérése
    this.foglalasService.getFoglalasok().subscribe({
      next: (data) => {
        const user = this.authService.getUser();
        this.foglalasok = data.filter(
          (f: any) => f.felhasznalo._id === user.id
        );
      },
      error: () => {}
    });
  }

  foglalasMondas(id: string): void {
    if (!confirm('Biztosan lemondod a foglalást?')) return;

    this.foglalasService.deleteFoglalas(id).subscribe({
      next: () => {
        this.siker = 'Foglalás sikeresen lemondva!';
        this.foglalasok = this.foglalasok.filter(f => f._id !== id);
      },
      error: () => {
        this.hiba = 'Sikertelen lemondás!';
      }
    });
  }

  vissza(): void {
    this.router.navigate(['/home']);
  }
}