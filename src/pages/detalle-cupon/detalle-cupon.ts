import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the DetalleCuponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-cupon',
  templateUrl: 'detalle-cupon.html',
})
export class DetalleCuponPage {

  //declarar variables
  idSucursal: any;
  cupones: any;
  sucursales: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afs: AngularFirestore) {
                //recibe parametro de la reservacion
                this.idSucursal = this.navParams.get("idSucursal");
              //obtener los cupones de la  sucursal seleccionada
                this.afs.collection('cupones', ref => ref.where('idSucursal', '==', this.idSucursal)).valueChanges().subscribe( c => {
                  this.cupones = c;
                });
                //info de las sucrsales
                this.afs.collection('sucursales').valueChanges().subscribe( s => {
                  this.sucursales = s;
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleCuponPage');
  }

}
