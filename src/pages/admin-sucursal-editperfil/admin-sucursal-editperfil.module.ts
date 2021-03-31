import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminSucursalEditperfilPage } from './admin-sucursal-editperfil';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AdminSucursalEditperfilPage,
  ],
  imports: [
    AgmCoreModule,
    IonicPageModule.forChild(AdminSucursalEditperfilPage),
  ],
})
export class AdminSucursalEditperfilPageModule {}
