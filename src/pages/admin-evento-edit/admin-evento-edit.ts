import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { ArchivoSubir } from '../../providers/carga-archivo/ArchivoSubir';
import { AdminEventoImageEditPage } from '../admin-evento-image-edit/admin-evento-image-edit';



@IonicPage()
@Component({
  selector: 'page-admin-evento-edit',
  templateUrl: 'admin-evento-edit.html',
})
export class AdminEventoEditPage {
  data: any = {};
  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public _cap: CargaArchivoProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEventoEditPage');
  }

  saveEventoItem(eventoItem: ArchivoSubir){
    console.log(eventoItem);
   this.data ={
      titulo: this._cap.selectedEventoItem.titulo,
      fecha: this._cap.selectedEventoItem.fecha,
      hora: this._cap.selectedEventoItem.hora,
      hora_fin: this._cap.selectedEventoItem.hora_fin,
      categoria: this._cap.selectedEventoItem.categoria,
      lugar: this._cap.selectedEventoItem.lugar,
      obs: this._cap.selectedEventoItem.obs,
      img: this._cap.selectedEventoItem.img,
      KEY: this._cap.selectedEventoItem.key
    }
    console.log(this.data);
    this._cap.updateEvento(this.data, this._cap.selectedEventoItem.uid);
    console.log(this._cap.selectedEventoItem.uid);
    this.navCtrl.pop();
  }
  editEventoImg(key, uid) {
    this.navCtrl.push(AdminEventoImageEditPage, {key:key, uid:uid});
    // this.navCtrl.push(AdminEventoImageEditPage, {uid:uid});
  }
}
