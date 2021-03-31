import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarCuponesPage } from './agregar-cupones';

@NgModule({
  declarations: [
    AgregarCuponesPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarCuponesPage),
  ],
})
export class AgregarCuponesPageModule {}
