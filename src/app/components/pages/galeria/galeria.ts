import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Libro } from 'src/app/models/libro-model';
import { LibrosService } from 'src/app/services/libros-service';

@Component({
  selector: 'app-galeria',
  imports: [RouterLink],
  templateUrl: './galeria.html',
  styleUrl: './galeria.css',
})
export class Galeria {
  private bookService = inject(BookService);

  books = signal<BookInterface[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.bookService.listar().subscribe({
      next: (data) => {
        this.books.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los libros');
        this.loading.set(false);
      }
    });
  }

  siguientePagina(): void {
    if (this.page() < this.lastPage()) {
      this.page.update(p => p + 1);
      this.cargarLibros();
    }
  }

  paginaAnterior(): void {
    if (this.page() > 1) {
      this.page.update(p => p - 1);
      this.cargarLibros();
    }
  }

  truncar(texto: string | undefined, max = 100): string {
    if (!texto) return '';
    return texto.length > max ? texto.slice(0, max) + '...' : texto;
  }
}
