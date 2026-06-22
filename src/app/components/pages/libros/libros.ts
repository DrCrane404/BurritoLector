import { Component, inject, signal, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Libro } from "src/app/models/libro-model";
import { LibrosService } from "src/app/services/libros-service";
import { LoginService } from "src/app/services/login-service";
import { RatingService } from "src/app/services/rating-service";


@Component({
    selector: 'app-libros',
    templateUrl: './libros.html',
    standalone: true,
    imports: [RouterLink],
    styleUrl: './libros.css',
})
export class Libros implements OnInit {
  private route = inject(ActivatedRoute);
  private librosService = inject(LibrosService);
  private ratingService = inject(RatingService);
  private loginService = inject(LoginService);


  libro = signal<Libro | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  userScore = signal<number>(0);      // estrella seleccionada
  hoveredStar = signal<number>(0);    // estrella hover (visual)
  ratingId = signal<number | null>(null);
  ratingEnviado = signal<boolean>(false);
  ratingError = signal<string | null>(null);

  private getUserId(): number {
    const token = this.loginService.recuperarToken();
    const payload = JSON.parse(atob(token!.split('.')[1]));
    return payload.sub ?? payload.id ?? payload.userId;
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.librosService.findOne(id).subscribe({
      next: (data) => {
        this.libro.set(data);
        this.loading.set(false);
        this.cargarRatingPrevio(id);
      },
      error: () => {
        this.error.set('No se pudo cargar el libro');
        this.loading.set(false);
      }
    });
  }

  cargarRatingPrevio(bookId: number) {
    const userId = this.getUserId();
    console.log('🔍 Buscando rating — bookId:', bookId, 'userId:', userId);
    this.ratingService.findByBookAndUser(bookId, userId).subscribe({
      next: (rating) => {
        console.log('✅ Rating encontrado:', rating);
        if (rating) {
          this.userScore.set(rating.score);
          this.ratingId.set(rating.id);
        }
      },
      error: () => {
        console.log('❌ No se encontró rating previo');
      }
    });
  }

  seleccionarEstrella(star: number) {
    this.userScore.set(star);
    this.ratingEnviado.set(false);
    this.ratingError.set(null);

    const userId = this.getUserId();
    const bookId = this.libro()!.id;
    const id = this.ratingId();
    
    const request$ = id
      ? this.ratingService.actualizar(id, star)
      : this.ratingService.calificar({ userId, bookId, score: star });

    request$.subscribe({
      next: (res) => {
        if (!id && res?.id) this.ratingId.set(res.id);
        this.ratingEnviado.set(true);
      },
      error: () => this.ratingError.set('Error al guardar calificación')
    });
  }
}