import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Forgot } from './components/auth/forgot/forgot';
import { Galeria } from './components/pages/galeria/galeria';
import { Notfound } from './components/pages/notfound/notfound';
import { Afinidad } from './components/pages/afinidad/afinidad';

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
        path: 'galeria',
        component: Galeria
    },

    {
        path: '**',
        component: Notfound
    },

    {
        path: 'afinidad',
        component: Afinidad
    }
];

