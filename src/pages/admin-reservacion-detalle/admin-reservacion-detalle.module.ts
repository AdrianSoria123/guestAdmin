import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminReservacionDetallePage } from './admin-reservacion-detalle';

@NgModule({
  declarations: [
    AdminReservacionDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminReservacionDetallePage),
  ],
})
export class AdminReservacionDetallePageModule {}
