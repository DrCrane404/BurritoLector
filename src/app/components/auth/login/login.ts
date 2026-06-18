import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginInterface } from 'src/app/models/login-interface';
import { form, required, FormField } from '@angular/forms/signals';
import { LoginService } from 'src/app/services/login-service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginModel = signal<LoginInterface>({
    email : '',
    password: ''
  })

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El correo es requerido' });
    required(schemaPath.password, { message: 'la contraseña es requerida' });
  })

  constructor(private loginService: LoginService, private router: Router) {

  }

  login() {
    this.loginService.login(this.loginModel()).subscribe({
      next: (response: any) => { // Puedes tiparlo con una interface si lo prefieres

        this.loginService.guardarToken(
        response.access_token,
        response.user.role
      );

      if (response.user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/galeria']);
      }

    },
    error: (err) => {
  console.error('El verdadero error interno es:', err);
  alert('Ocurrió un error');
}})
  


}
}
