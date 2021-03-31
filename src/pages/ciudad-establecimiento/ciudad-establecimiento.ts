import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgregarCiudadPage } from '../agregar-ciudad/agregar-ciudad';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminMenuReservacionPage } from '../admin-menu-reservacion/admin-menu-reservacion';

@IonicPage()
@Component({
  selector: 'page-ciudad-establecimiento',
  templateUrl: 'ciudad-establecimiento.html',
})
export class CiudadEstablecimientoPage {
  //declarar variables
  establecimientos: any;
  ciudades: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CiudadEstablecimientoPage');
    this.cargarCiudadesData();
  }
  //funcion cargar info de establecimientos
  cargarCiudadesData(){
    this.afs.collection('ciudades').valueChanges().subscribe( ciudades => {
      this.ciudades = ciudades;
    });
  }

  agregarCiudad(){
      this.navCtrl.push(AgregarCiudadPage);
  }
  goBack() {
    this.navCtrl.push(AdminMenuReservacionPage);
  }

}
