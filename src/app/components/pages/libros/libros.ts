import { Component, inject, signal, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Libro } from "src/app/models/libro-model";
import { LibrosService } from "src/app/services/libros-service";


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

  libro = signal<Libro | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.librosService.findOne(id).subscribe({
      next: (data) => {
        this.libro.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el libro');
        this.loading.set(false);
      }
    });
  }
}
