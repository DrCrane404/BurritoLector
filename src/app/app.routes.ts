import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Forgot } from './components/auth/forgot/forgot';

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
];
