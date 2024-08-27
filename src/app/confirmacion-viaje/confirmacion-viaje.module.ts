import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionViajePageRoutingModule } from './confirmacion-viaje-routing.module';

import { ConfirmacionViajePage } from './confirmacion-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionViajePageRoutingModule
  ],
  declarations: [ConfirmacionViajePage]
})
export class ConfirmacionViajePageModule {}
