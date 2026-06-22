import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';
import { Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (!loginService.sesionIniciada()) {
        router.navigateByUrl('/auth/login');
        return false;
    }

    if (!loginService.esAdmin()) {
        // Está logueado pero no tiene permiso -> mándalo a SU área, no al login
        router.navigateByUrl('/burritolector/dash');
        return false;
    }

    return true;
};
