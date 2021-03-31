import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartaProvider } from '../../providers/carta/carta';
import { ReservacionProvider } from '../../providers/reservacion/reservacion';
import { CartaPage } from '../carta/carta';

@IonicPage()
@Component({
  selector: "page-producto-detalle",
  templateUrl: "producto-detalle.html"
})
export class ProductoDetallePage {
  idProducto: any;
  product: any = {};
  pisto = 0;
  idReservacion: any;
  disableButton: any = true;
  evento: any;
  idSucursal: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _providerCarta: CartaProvider,
    public _providerReservacion: ReservacionProvider
  ) {
    this.idProducto = navParams.get("idProducto");
    this.idReservacion = navParams.get("idReservacion");
    this.evento = navParams.get("uid");
    this.idSucursal = navParams.get("idSucursal");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProductoDetallePage");
    this.getProduct(this.idProducto);
  }

  getProduct(idProducto) {
    this._providerCarta.getProduct(idProducto).subscribe(product => {
      this.product = product;
      console.log("Detalle producto: ", this.product.titulo);
    });
  }

  increment() {
    if (this.pisto < 20) {
      this.pisto++;
    }
  }

  decrement() {
    if (this.pisto > 0) {
      this.pisto--;
    }
  }

  validarBoton() {
    if (this.pisto >= 1) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  agregar() {
    const producto = {
      cantidad: this.pisto,
      idProducto: this.idProducto,
      idReservacion: this.idReservacion
    };
    this._providerReservacion
      .addProducto(producto)
      .then((respuesta: any) => {
        if (respuesta.success == true) {
          this.navCtrl.push(CartaPage, {
            idReservacion: this.idReservacion,
            uid: this.evento,
            idSucursal: this.idSucursal
          });
        } else {
        }
      })
      .catch();
  }

  goBack() {
    this.navCtrl.push(CartaPage, {
      idReservacion: this.idReservacion,
      uid: this.evento,
      idSucursal: this.idSucursal
    });
  }
}
