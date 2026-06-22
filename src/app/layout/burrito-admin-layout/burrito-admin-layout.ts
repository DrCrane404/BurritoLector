import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-burrito-admin-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './burrito-admin-layout.html',
  styleUrl: './burrito-admin-layout.css',
})
export class BurritoAdminLayout {
  constructor(private loginService: LoginService, private router: Router) {}
  
    cerrarSesion() {
      this.loginService.cerrarSesion();
      this.router.navigate(['/auth/login']);
    } 
}
