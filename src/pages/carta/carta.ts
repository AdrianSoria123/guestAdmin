import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
//Firebase
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs-compat';
//import { map } from 'rxjs-compat/operators';
//import { CargaArchivoCartaProvider } from '../../providers/carga-archivo-carta/carga-archivo';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductoDetallePage } from '../producto-detalle/producto-detalle';
import { ReservacionesPage } from '../reservaciones/reservaciones';


@IonicPage()
@Component({
  selector: "page-carta",
  templateUrl: "carta.html"
})
export class CartaPage {
  cartas = [];
  idReservacion: any;
  idSucursal: any;
  evento: any;
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public afDB: AngularFireDatabase,
    public afs: AngularFirestore,
    public modalCtrl: ModalController
  ) //private _cap: CargaArchivoCartaProvider
  {
    this.afs
      .collection("cartas")
      .valueChanges()
      .subscribe(c => {
        this.cartas = c;
        console.log("cartas", c);
      });
    //  this.cartas = afDB.list('bebidas').valueChanges();
    this.idReservacion = localStorage.getItem("idReservacion");
    this.idSucursal = navParam.get("idSucursal");
    this.evento = navParam.get('uid');
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CartaPage");
  }

  goBack() {
    this.navCtrl.push(ReservacionesPage, {
      idReservacion: this.idReservacion,
      idSucursal: this.idSucursal,
      uid: this.evento
    });
  }

  productoDetalle(idProducto) {
    this.navCtrl.push(ProductoDetallePage, {
      idProducto: idProducto,
      idReservacion: this.idReservacion,
      uid: this.evento,
      idSucursal: this.idSucursal
    });
  }
}
