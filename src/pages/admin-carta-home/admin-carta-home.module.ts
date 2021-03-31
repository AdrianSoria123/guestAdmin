import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCartaHomePage } from './admin-carta-home';

@NgModule({
  declarations: [
    AdminCartaHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCartaHomePage),
  ],
})
export class AdminCartaHomePageModule {}
