import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../models/login-interface';

interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    user: {
      id: string;
      email: string;
      role: 'admin' | 'user';
    };
  };
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  URL = 'https://api-burritolector.onrender.com/auth/login';

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  login(credentials: LoginInterface): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.URL, credentials).pipe(
      tap(response => {
        const token = response.data.access_token;
        const decoded = this.decodeToken(token);
        const role = decoded?.role ?? 'user';
        this.guardarToken(token, role);
      })
    );
  }

  guardarToken(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  recuperarToken(): string | null {
    return localStorage.getItem('token');
  }

  recuperarRol(): string | null {
    return localStorage.getItem('role');
  }

  esAdmin(): boolean {
    return this.recuperarRol() === 'admin';
  }

  esUsuario(): boolean {
    return this.recuperarRol() === 'user';
  }

  sesionIniciada(): boolean {
    return this.recuperarToken() !== null;
  }
}
