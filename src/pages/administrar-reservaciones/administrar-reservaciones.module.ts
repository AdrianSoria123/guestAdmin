import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdministrarReservacionesPage } from './administrar-reservaciones';

@NgModule({
  declarations: [
    AdministrarReservacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministrarReservacionesPage),
  ],
})
export class AdministrarReservacionesPageModule {}
