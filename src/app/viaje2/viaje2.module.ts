import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Viaje2PageRoutingModule } from './viaje2-routing.module';

import { Viaje2Page } from './viaje2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Viaje2PageRoutingModule
  ],
  declarations: [Viaje2Page]
})
export class Viaje2PageModule {}
