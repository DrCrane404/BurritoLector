import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginInterface } from 'src/app/models/login-interface';
import { form, required, FormField } from '@angular/forms/signals';
import { LoginService } from 'src/app/services/login-service';


@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginModel = signal<LoginInterface>({
    email: '',
    password: ''
  })
 showPassword = signal(false);

  togglePassword() {
    this.showPassword.update(value => !value);
  }
  

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El correo es requerido' });
    required(schemaPath.password, { message: 'la contraseña es requerida' });
  })

  constructor(private loginService: LoginService, private router: Router) {

  }
 


  ///////////////////////
  login() {
  this.loginService.login(this.loginModel()).subscribe({
    next: () => {
      // El rol ya fue guardado en el tap() del servicio
      const role = localStorage.getItem('role');

      if (role === 'admin') {
        this.router.navigate(['burritoadministrador/dash']);
      } else {
        this.router.navigate(['/burritolector/galeria']);
      }
    },
    error: (err) => {
      console.error('Error:', err);
      alert('Correo o contraseña incorrectos');
    }
  });
}
  //////////////////////
  // login() {
  //   this.loginService.login(this.loginModel()).subscribe({
  //     next: (response: any) => {
  //       // Ya no hace falta guardarToken aquí, el servicio ya lo hizo

  //       if (response.user.role === 'admin') {
  //         this.router.navigate(['/burritoadministrador/dash']);
  //       } else {
  //         this.router.navigate(['/burritolector/galeria']);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('El verdadero error interno es:', err);
  //       alert('Ocurrió un error');
  //     }
  //   });
  // }
}
