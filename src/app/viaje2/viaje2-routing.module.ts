import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Viaje2Page } from './viaje2.page';

const routes: Routes = [
  {
    path: '',
    component: Viaje2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Viaje2PageRoutingModule {}
