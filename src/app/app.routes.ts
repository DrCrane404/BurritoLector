import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';

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
];
