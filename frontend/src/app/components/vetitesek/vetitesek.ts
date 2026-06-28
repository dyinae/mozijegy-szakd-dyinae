import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VetitesService } from '../../services/vetites.service';
import { FoglalasService } from '../../services/foglalas.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vetitesek',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vetitesek.html',
  styleUrl: './vetitesek.css'
})
export class VetitesekComponent implements OnInit {
  vetites: any = null;
  kivalasztottSzekek: number[] = [];
  sajatFoglalasok: any[] = [];
  toltesAlatt = true;
  hiba = '';
  siker = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vetitesService: VetitesService,
    private foglalasService: FoglalasService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.vetitesekBetoltese(id);
    if (this.authService.isLoggedIn()) {
      this.sajatFoglalasokBetoltese();
    }
  }

  vetitesekBetoltese(id: string): void {
    this.vetitesService.getVetitesek().subscribe({
      next: (data) => {
        const filmVetitesek = data.filter(
          (v: any) => v.film._id === id
        );
        if (filmVetitesek.length === 0) {
          this.hiba = 'Ehhez a filmhez nincs elérhető vetítés!';
          this.toltesAlatt = false;
          this.cdr.detectChanges();
          return;
        }
        this.vetites = filmVetitesek[0];
        this.toltesAlatt = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.hiba = 'Vetítés nem található!';
        this.toltesAlatt = false;
        this.cdr.detectChanges();
      }
    });
  }

  sajatFoglalasokBetoltese(): void {
    this.foglalasService.getFoglalasok().subscribe({
      next: (data) => {
        const user = this.authService.getUser();
        this.sajatFoglalasok = data.filter(
          (f: any) => f.felhasznalo?._id === user.id &&
                      f.statusz === 'aktív'
        );
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  szekToggle(szekSzam: number): void {
    const index = this.kivalasztottSzekek.indexOf(szekSzam);
    if (index === -1) {
      this.kivalasztottSzekek.push(szekSzam);
    } else {
      this.kivalasztottSzekek.splice(index, 1);
    }
    this.cdr.detectChanges();
  }

  kivalasztottE(szekSzam: number): boolean {
    return this.kivalasztottSzekek.includes(szekSzam);
  }

  get osszesSzek(): number[] {
    if (!this.vetites) return [];
    return Array.from(
      { length: this.vetites.osszesUlohely },
      (_, i) => i + 1
    );
  }

  get vegosszeg(): number {
    if (!this.vetites) return 0;
    return this.vetites.jegyAr * this.kivalasztottSzekek.length;
  }

  foglalas(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.kivalasztottSzekek.length === 0) {
      this.hiba = 'Válassz legalább egy széket!';
      this.cdr.detectChanges();
      return;
    }

    const user = this.authService.getUser();

    this.foglalasService.createFoglalas({
      felhasznalo: user.id,
      vetites: this.vetites._id,
      ulohelyek: this.kivalasztottSzekek
    }).subscribe({
      next: () => {
        this.siker = 'Sikeres foglalás! 🎉';
        this.kivalasztottSzekek = [];

        // Frissítjük a vetítés és foglalások adatait
        const id = this.route.snapshot.paramMap.get('id');
        if (id) this.vetitesekBetoltese(id);
        this.sajatFoglalasokBetoltese();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.hiba = err.error?.message || 'Sikertelen foglalás!';
        this.cdr.detectChanges();
      }
    });
  }

  foglalasMondas(foglalasId: string): void {
    if (!confirm('Biztosan lemondod a foglalást?')) return;

    this.foglalasService.deleteFoglalas(foglalasId).subscribe({
      next: () => {
        this.siker = 'Foglalás sikeresen lemondva!';
        this.sajatFoglalasok = this.sajatFoglalasok.filter(
          f => f._id !== foglalasId
        );
        // Frissítjük a vetítés adatait
        const id = this.route.snapshot.paramMap.get('id');
        if (id) this.vetitesekBetoltese(id);
        this.cdr.detectChanges();
      },
      error: () => {
        this.hiba = 'Sikertelen lemondás!';
        this.cdr.detectChanges();
      }
    });
  }

  vissza(): void {
    this.router.navigate(['/filmek']);
  }
}