import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonitoreoReservasProvider } from '../../providers/monitoreo-reservas/monitoreo-reservas';
import { AdminReservacionDetallePage } from '../admin-reservacion-detalle/admin-reservacion-detalle';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-admin-historial-reservaciones',
  templateUrl: 'admin-historial-reservaciones.html',
})
export class AdminHistorialReservacionesPage {
  reservaciones: any = [];
  clientes: any;
  sucursales: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afs: AngularFirestore,
              public monRes: MonitoreoReservasProvider) {
  }

  ionViewDidLoad() {
    this.getAllReservacione();
    this.getClientes();
  }
  getAllReservacione() {
    const id = localStorage.getItem('uidSucursal');
    //Cuando es un usuario se saca el id de la sucursal ala que pertenece
     this.afs.collection('users', ref => ref.where('uid', '==', id)).valueChanges().subscribe(data => {
     this.sucursales = data;
       this.sucursales.forEach(element => {
         const uidSucursal = element.uidSucursal;
         this.monRes.getReservacionesPagando(uidSucursal).subscribe( reser => {
           this.reservaciones = reser;
           console.log('reservaciones', reser);
         })
       });
      });
    this.monRes.getReservacionesPagando(id).subscribe( reser => {
      this.reservaciones = reser;
      console.log('reservaciones', reser);
    })
  }
  getClientes() {
    this.monRes.getAllClientes("users").then(c =>{
          this.clientes = c;
          console.log("Estos son los clientes: ",this.clientes);
        });
  }
  goDetalle(idReservacion) {
    this.navCtrl.push(AdminReservacionDetallePage, {idReservacion:idReservacion});
  }

}
