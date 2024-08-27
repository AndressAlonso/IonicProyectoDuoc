import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RContrasenaPageRoutingModule } from './r-contrasena-routing.module';

import { RContrasenaPage } from './r-contrasena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RContrasenaPageRoutingModule
  ],
  declarations: [RContrasenaPage]
})
export class RContrasenaPageModule {}
