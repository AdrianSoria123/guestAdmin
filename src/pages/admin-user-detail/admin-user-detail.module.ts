import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminUserDetailPage } from './admin-user-detail';

@NgModule({
  declarations: [
    AdminUserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminUserDetailPage),
  ],
})
export class AdminUserDetailPageModule {}
