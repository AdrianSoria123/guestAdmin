import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarCiudadPage } from './agregar-ciudad';

@NgModule({
  declarations: [
    AgregarCiudadPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarCiudadPage),
  ],
})
export class AgregarCiudadPageModule {}
