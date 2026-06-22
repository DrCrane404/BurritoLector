import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

interface ApiWrapper<T> {
  success: boolean;
  data: T;
  statusCode?: number;
}

interface Rating {
  id: number;
  userId: number;
  bookId: number;
  score: number;
}

interface RatingDto {
  userId: number;
  bookId: number;
  score: number;
}

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private http = inject(HttpClient);

  findByBookAndUser(bookId: number, userId: number): Observable<Rating | null> {
    return this.http
      .get<ApiWrapper<Rating | null>>(`${environment.apiUrl}/ratings/book/${bookId}/user/${userId}`)
      .pipe(map(res => res.data));
  }

  calificar(dto: RatingDto): Observable<any> {
    return this.http
      .post<ApiWrapper<any>>(`${environment.apiUrl}/ratings`, dto)
      .pipe(map(res => res.data));
  }

  actualizar(ratingId: number, score: number): Observable<any> {
    return this.http
      .patch<ApiWrapper<any>>(`${environment.apiUrl}/ratings/${ratingId}`, { score })
      .pipe(map(res => res.data));
  }
}