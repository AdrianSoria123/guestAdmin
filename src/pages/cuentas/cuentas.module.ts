import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuentasPage } from './cuentas';

@NgModule({
  declarations: [
    CuentasPage,
  ],
  imports: [
    IonicPageModule.forChild(CuentasPage),
  ],
})
export class CorteVentaPageModule {}
