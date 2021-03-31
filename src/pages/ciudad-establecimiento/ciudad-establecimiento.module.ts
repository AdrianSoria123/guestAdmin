import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CiudadEstablecimientoPage } from './ciudad-establecimiento';

@NgModule({
  declarations: [
    CiudadEstablecimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(CiudadEstablecimientoPage),
  ],
})
export class CiudadEstablecimientoPageModule {}
