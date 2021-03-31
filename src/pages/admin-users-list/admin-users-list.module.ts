import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUsersListPage } from './admin-users-list';

@NgModule({
  declarations: [
    AdminUsersListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUsersListPage),
  ],
})
export class AdminUsersListPageModule {}
