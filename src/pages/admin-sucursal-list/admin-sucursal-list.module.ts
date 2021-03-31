import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSucursalListPage } from './admin-sucursal-list';

@NgModule({
  declarations: [
    AdminSucursalListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminSucursalListPage),
  ],
})
export class AdminSucursalListPageModule {}
