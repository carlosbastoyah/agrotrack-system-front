import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loadRemoteModule } from '@angular-architects/native-federation';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    { path: 'main', component: MainLayoutComponent },
    {
        path: 'administration',
        loadChildren: () =>
            loadRemoteModule('administration', './Module')
                .then((m) => m.AppModule),
    },
    {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }