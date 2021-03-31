import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEventoEditPage } from './admin-evento-edit';

@NgModule({
  declarations: [
    AdminEventoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEventoEditPage),
  ],
})
export class AdminEventoEditPageModule {}
