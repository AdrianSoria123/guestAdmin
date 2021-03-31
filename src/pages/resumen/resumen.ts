import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from "moment";
import { ResumenProvider } from '../../providers/resumen/resumen';

@IonicPage()
@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

  idSucursal: any;
  idReservacion: any;
  uidEvento: any;
  r: any = {};
  mes: any;
  diasN: any;
  dias: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public _resumenProvider: ResumenProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumenPage');
    this.loadNavParams();
    this.getReservacion();
  }

  loadNavParams(){
    this.idSucursal =  this.navParams.get("idSucursal");
    this.idReservacion =  this.navParams.get("idReservacion");
    this.uidEvento = this.navParams.get('uid');
  }

  getReservacion(){
    this._resumenProvider.gerReservacion(this.idReservacion).subscribe(reservacion => {
      this.r =  reservacion;
      console.log('Reserva: ', reservacion);
      const month = moment(Number(reservacion.fechaR_));
      month.locale("es");
      console.log("Mes", month.format("MMM"));
      console.log("Día", month.format("DD"));
      console.log("Día", month.format("dddd"));
      this.mes = month.format("MMM");
      this.diasN = month.format("DD");
      this.dias = month.format("dddd");
    });
  }

  getSucursal(){
    this._resumenProvider.getSucursal(this.idSucursal).subscribe(sucursal => {
      console.log('Sucursal', sucursal);

    });
  }

}
