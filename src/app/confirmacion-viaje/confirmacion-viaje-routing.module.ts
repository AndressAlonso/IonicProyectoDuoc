import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionViajePage } from './confirmacion-viaje.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionViajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmacionViajePageRoutingModule {}
