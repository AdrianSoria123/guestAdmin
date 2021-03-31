import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminMenuReservacionPage } from './admin-menu-reservacion';

@NgModule({
  declarations: [
    AdminMenuReservacionPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminMenuReservacionPage),
  ],
})
export class AdminMenuReservacionPageModule {}
