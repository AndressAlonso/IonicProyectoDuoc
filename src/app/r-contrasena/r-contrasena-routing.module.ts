import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RContrasenaPage } from './r-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: RContrasenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RContrasenaPageRoutingModule {}
