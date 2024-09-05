import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Transporte2PageRoutingModule } from './transporte2-routing.module';

import { Transporte2Page } from './transporte2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Transporte2PageRoutingModule
  ],
  declarations: [Transporte2Page]
})
export class Transporte2PageModule {}
