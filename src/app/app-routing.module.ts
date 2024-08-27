import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'r-contrasena',
    loadChildren: () => import('./r-contrasena/r-contrasena.module').then( m => m.RContrasenaPageModule)
  },
  {
    path: 'viaje',
    loadChildren: () => import('./viaje/viaje.module').then( m => m.ViajePageModule)
  },
  {
    path: 'transporte',
    loadChildren: () => import('./transporte/transporte.module').then( m => m.TransportePageModule)
  },
  {
    path: 'confirmacion-viaje',
    loadChildren: () => import('./confirmacion-viaje/confirmacion-viaje.module').then( m => m.ConfirmacionViajePageModule)
  },
  {
    path: 'resumen-viaje',
    loadChildren: () => import('./resumen-viaje/resumen-viaje.module').then( m => m.ResumenViajePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
