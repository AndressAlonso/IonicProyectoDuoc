import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Transporte2Page } from './transporte2.page';

const routes: Routes = [
  {
    path: '',
    component: Transporte2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Transporte2PageRoutingModule {}
