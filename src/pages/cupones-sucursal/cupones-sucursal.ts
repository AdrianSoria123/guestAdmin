import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarCuponesPage } from '../agregar-cupones/agregar-cupones';
import { DetalleCuponPage } from '../detalle-cupon/detalle-cupon';
/**
 * Generated class for the CuponesSucursalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cupones-sucursal',
  templateUrl: 'cupones-sucursal.html',
})
export class CuponesSucursalPage {
  //declarar variables
  sucursales: any;
  cupones: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afs: AngularFirestore){

    //cargar info de las sucursales
    this.afs.collection('sucursales').valueChanges().subscribe( s => {
      this.sucursales = s;
    });
    //cargar info de los cupones
    //this.afs.collection('cupones').valueChanges().subscribe( c => {
      //this.cupones = c;
    //});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuponesSucursalPage');
  }

  agregarCupon() {
      this.navCtrl.push(AgregarCuponesPage);
  }

  cuponesDisponibles(idSucursal){
     this.navCtrl.push(DetalleCuponPage, {idSucursal: idSucursal});
  }

}
