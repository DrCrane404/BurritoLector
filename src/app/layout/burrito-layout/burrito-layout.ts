import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from "@angular/router";
import { LoginService } from 'src/app/services/login-service';


@Component({
  selector: 'app-burrito-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './burrito-layout.html',
  styleUrl: './burrito-layout.css',
})
export class BurritoLayout {

  constructor(private loginService: LoginService, private router: Router) {}

  cerrarSesion() {
    this.loginService.cerrarSesion();
    this.router.navigate(['/auth/login']);
  } 
}
