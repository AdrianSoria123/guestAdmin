import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, AlertController
} from 'ionic-angular';
import { SucursalAltaProvider, Credenciales } from '../../providers/sucursal-alta/sucursal-alta';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReservacionProvider } from '../../providers/reservacion/reservacion';


import { ViewChild } from '@angular/core';
import { Content } from 'ionic-angular';
import * as moment from "moment";

@IonicPage()
@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html',
})
export class CuentasPage {
  sucursalItem: Credenciales = { };
  data: any = {};
  reservaciones: any[];
  myForm: FormGroup;
  fechaI:any;
  fechaF:any;
  contador:any;
  productos = [];
  sumatoria: number;
  comision1: number;
  comision2: number;
  propina: number;
  nombreSucursal: any;
  idSucursal: any;

  @ViewChild(Content) content: Content;

  
    constructor(
    
    public navCtrl: NavController,
    public navParams: NavParams,
    public sucProv: SucursalAltaProvider,
    //public toastCtrl: ToastController,
    //public Fiauth: AngularFireAuth,
    // private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone
    //public zone: NgZone,
    //public platform: Platform,
    public alertCtrl: AlertController,
    public _reservaciones: ReservacionProvider,
    public formBuilder: FormBuilder

    ) {  this.myForm = this.createMyForm();
    
    }

    public ocultar1: boolean = false;
      accion1(){
      this.ocultar1 = !this.ocultar1;
    }
 
    private createMyForm(){
      return this.formBuilder.group({
        FechaInicio: ['', Validators.required],
        FechaFin: ['', Validators.required]
      });
    }
    

  ionViewDidLoad() {
    this.idSucursal = this.navParams.get("uidSucursal");
    console.log('id sucursal',this.idSucursal);

    // this.nombreSucursal=this.sucProv.selectedSucursalItem.displayName;
    // this.idSucursal=this.sucProv.selectedSucursalItem.uid;
    this.contador=0;
    this.sumatoria=0;
    // this.getReservaciones(this.idSucursal);
  }
  
  saveData(){
    console.log(this.myForm.value);
    console.log('Fecha Inicio',this.myForm.value.FechaInicio);
    console.log('Fecha Fin',this.myForm.value.FechaFin);
    this.fechaI=this.myForm.value.FechaInicio;
    this.fechaF=this.myForm.value.FechaFin;

    const fech=moment(this.fechaI).format("x");
    console.log(fech);
    this.getReservaciones(this.idSucursal, this.fechaI, this.fechaF);
    this.contador=0;
  }
  getReservaciones(idx, fechaI, fechaF){
    console.log('llamar provider',idx);
     this._reservaciones.getReservaciones(idx, fechaI, fechaF).subscribe(res=>{
      console.log("Este es el resultado de reservaciones: ", res);

      let suma=0;
      res.forEach(function (value) {
        //console.log('totalResercva', value.totalReservacion);
        if(value.totalReservacion != null){
          suma=suma+parseFloat(value.totalReservacion);
        }
        
        console.log('suma', suma);
      });
      this.fechaI=fechaI;
      this.fechaF=fechaF;

      this.sumatoria=suma;
      this.comision1=suma*0.056;
      this.comision2=suma-this.comision1;
      this.propina= suma*.05;

      this.reservaciones = res;
      console.log('comision1',this.comision1);
      console.log('comision2',this.comision2);
    });
  }

  // guardarCorte(){
  //   console.log('***** F_Guardar_Corte');
  //   console.log('comision1',this.comision1);
  //   console.log('comision2',this.comision2);
  //   console.log('sumatoria',this.sumatoria);
  //   console.log('fechaI',this.fechaI);
  //   console.log('fechaF',this.fechaF);

  //   this._reservaciones.addCorte(this.fechaI, this.fechaF, this.comision1, this.comision2, this.sumatoria, this.idSucursal);
    

  // }

  suma(x){
    //this.contador=this.contador+1;
    //console.log(this.contador);
    console.log('idReservacion funcion',x);
  }

}
