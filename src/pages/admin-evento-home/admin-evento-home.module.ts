import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEventoHomePage } from './admin-evento-home';

@NgModule({
  declarations: [
    AdminEventoHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEventoHomePage),
  ],
})
export class AdminEventoHomePageModule {}
