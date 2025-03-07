import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';


export const routes: Routes = [




    {
        path: '', loadComponent: () => import("./layout/auth-layout/auth-layout.component").then((c) => c.AuthLayoutComponent), title: 'auth', 
       canActivate: [logedGuard] ,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),title:'login' },
            { path: 'register', loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent),title:'register' },
        ]
    },
    {
        path: '', loadComponent: () => import("./layout/main-layout/main-layout.component").then((c) => c.MainLayoutComponent), title: 'main',
        canActivate:[ authGuard ],
        children: [
            { path: '', redirectTo: 'timeline', pathMatch: 'full' },
            {
                path: 'timeline', loadComponent: () => import('./pages/timeline/timeline.component').then((c) => c.TimelineComponent),title:'timeline'
            }]
    },

    { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then((c) => c.NotfoundComponent),title:'notfoun' }



];
