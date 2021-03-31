import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUsersGuestPage } from './admin-users-guest';

@NgModule({
  declarations: [
    AdminUsersGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUsersGuestPage),
  ],
})
export class AdminUsersGuestPageModule {}
