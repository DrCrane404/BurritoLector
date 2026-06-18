import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Forgot } from './components/auth/forgot/forgot';
import { Galeria } from './components/pages/galeria/galeria';
import { Notfound } from './components/pages/notfound/notfound';
import { Afinidad } from './components/pages/afinidad/afinidad';
import { Profile } from './components/pages/profile/profile';
import { Dash } from './components/pages/dash/dash';
import { Libros } from './components/pages/libros/libros';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { authGuardGuard } from './guards/auth-guard-guard';


export const routes: Routes = [

    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth/login',
        component: Login
    },
    {
        path: 'auth/register',
        component: Register
    },
    {
        path: 'auth/forgot',
        component: Forgot
    },

    {
        path: 'profile',
        component: Profile
    },

    // Rutas para el rol LECTOR / USUARIO
    {
        path: 'burritolector',
        canActivate: [authGuardGuard],
        children: [
            {
                path: 'galeria',
                component: Galeria
            },
            {
                path: 'afinidad',
                component: Afinidad
            }
        ]
    },

    // Rutas para el rol ADMINISTRADOR
    {
        path: 'burritoadministrador',
        canActivate: [adminGuardGuard],
        children: [
            {
                path: 'dash',
                component: Dash
            },
            {
                path: 'libros',
                component: Libros
            }
        ]
    },

    {
        path: '**',
        component: Notfound
    }
];

