import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Observable } from 'rxjs-compat';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ReservacionesPage } from '../reservaciones/reservaciones';
import { AngularFirestore } from '@angular/fire/firestore';
@IonicPage()
@Component({
  selector: 'page-reservacion-1',
  templateUrl: 'reservacion-1.html',
})
export class Reservacion_1Page {
// sucursales: Observable<any[]>;
sucursales = [];
uid : string;
reservacion : any ={};
contador : any;
estado : any;
modificador: any;
public filterPost: '';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public afDB: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              ) {

    // this.sucursales = afDB.list('sucursales').valueChanges();
    this.uid = this.afAuth.auth.currentUser.uid;
    this.afs.collection('sucursales').valueChanges().subscribe( s => {
      this.sucursales = s;
      console.log('sucursale', this.sucursales);
    // afDB.list('sucursales').valueChanges().subscribe( s => {
    //   this.sucursales = s;
    //   console.log('sucursale', this.sucursales);      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Reservacion_1Page');
    // console.log('filtro', this.filterPost);
    
  }

  reservar(idSucursal){
        this.navCtrl.push(ReservacionesPage, {'idSucursal':idSucursal});                    
  }
  // filtro( ) {
  //   this.modificador = this.modificador.filter(( sucursal ) => {
  //     console.log('respuesta de filtro', this.modificador);      
  //     return sucursal.tipo == 'bar';
  //   })
  // }


}
