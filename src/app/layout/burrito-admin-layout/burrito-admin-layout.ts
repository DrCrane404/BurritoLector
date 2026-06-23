import { Component, Renderer2 } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { LoginService } from 'src/app/services/login-service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  name?: string;
}

@Component({
  selector: 'app-burrito-admin-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './burrito-admin-layout.html',
  styleUrl: './burrito-admin-layout.css',
})
export class BurritoAdminLayout {
  constructor(private loginService: LoginService, private router: Router, private renderer: Renderer2) {}
  
  public name: string | null = null;

  ngOnInit(): void {
    this.extractNameFromStorage();
  }

  private extractNameFromStorage(): void {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        const decoded = jwtDecode<JwtPayload>(token);
        this.name = decoded.name || 'Usuario sin nombre';
      } else {
        this.name = 'Invitado';
      }
    } catch (error) {
      this.name = 'Error';
    }
  }
  
  cerrarSesion() {
    this.loginService.cerrarSesion();
    this.router.navigate(['/auth/login']);
  }

  toggleSidebar() {
    const side = document.getElementById('sidebar');
    const side_cont = document.querySelector('.contents');

    if(side?.classList.contains('collapsed')){
      side?.classList.remove('collapsed');
      side_cont?.classList.remove('expanded');
    }else{
      side?.classList.add('collapsed');
      side_cont?.classList.add('expanded');
    }
  }
}
