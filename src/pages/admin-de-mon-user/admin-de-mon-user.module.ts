import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDeMonUserPage } from './admin-de-mon-user';

@NgModule({
  declarations: [
    AdminDeMonUserPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDeMonUserPage),
  ],
})
export class AdminDeMonUserPageModule {}
