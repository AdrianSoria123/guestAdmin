import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleCuponPage } from './detalle-cupon';

@NgModule({
  declarations: [
    DetalleCuponPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleCuponPage),
  ],
})
export class DetalleCuponPageModule {}
