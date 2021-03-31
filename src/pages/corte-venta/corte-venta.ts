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
  selector: 'page-corte-venta',
  templateUrl: 'corte-venta.html',
})
export class CorteVentaPage {
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
  propinaTotal: number;
  nombreSucursal: any;
  idSucursal: any;
  nuevoFolio: any;

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
    saveData(){
      console.log(this.myForm.value);
      console.log('Fecha Inicio',this.myForm.value.FechaInicio);
      console.log('Fecha Fin',this.myForm.value.FechaFin);
      this.fechaI=this.myForm.value.FechaInicio;
      this.fechaF=this.myForm.value.FechaFin;

      const fech=moment(this.fechaI).format("x");
      console.log(fech);
      this.getReservaciones(this.sucProv.selectedSucursalItem.uid, this.fechaI, this.fechaF);
      this.contador=0;
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CorteVentaPage');
    console.log('SUCURSALITEMM', this.sucProv.selectedSucursalItem);
    //this.sucursalItem = this.navParams.get('sucursalItem');    
    // this.servicioID = this.navParams.get("servicioID");    
    console.log('idSucursal1', this.sucProv.selectedSucursalItem.uid);
    console.log('nombreSucursal', this.sucProv.selectedSucursalItem.displayName);
    this.nombreSucursal=this.sucProv.selectedSucursalItem.displayName;
    this.idSucursal=this.sucProv.selectedSucursalItem.uid;
    this.getIdLast(this.idSucursal);
    this.contador=0;
    this.sumatoria=0;
    //this.getReservaciones(this.sucProv.selectedSucursalItem.uid);
  }
  
  getReservaciones(idx, fechaI, fechaF){
    console.log('llamar provider',idx);
   
     this._reservaciones.getReservaciones(idx, fechaI, fechaF).subscribe(res=>{
      console.log("Este es el resultado de reservaciones: ", res);

      let suma=0;
      let propina=0;
      res.forEach(function (value) {
        console.log('Propina', value.propina);

        if(value.totalReservacion != null){
          suma=suma+parseFloat(value.totalReservacion);          
        }
        if(value.propina != null){
          propina=propina+parseFloat(value.totalReservacion)*parseFloat(value.propina);
        }
        
        console.log('suma', suma);
        console.log('propinaTotal: ', propina);
      });
      this.fechaI=fechaI;
      this.fechaF=fechaF;

      this.sumatoria=suma;
      this.comision1=suma*0.056;
      this.comision2=suma-this.comision1;
      this.propinaTotal= propina;

      this.reservaciones = res;
      console.log('comision1',this.comision1);
      console.log('comision2',this.comision2);

    });
  }

  getIdLast(idx){
    let x=0;
     this._reservaciones.getIdLast(idx).subscribe(res=>{
      console.log("Este es el resultado de corte: ", res);
       res.forEach(function (value){
         console.log('ultimo folio',value.folio);
         x=value.folio+1;
       });
       this.nuevoFolio=x;
       console.log('nuevo folio: ',this.nuevoFolio);
    });

  }

  guardarCorte(){
    
    console.log('***** F_Guardar_Corte');
    // FechaI, FechaF, comisionGuest(5.6%), comisionSucursal(94.4%), sumaReservaioners, Sucursal, propina 
    this._reservaciones.addCorte(this.fechaI, this.fechaF, this.comision1, this.comision2, this.sumatoria, this.idSucursal,this.propinaTotal, this.nuevoFolio);
    this.presentAlert();
  }

  suma(x){
    //this.contador=this.contador+1;
    //console.log(this.contador);
    console.log('idReservacion funcion',x);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Corte guardado',
      subTitle: '',
      buttons: ['Aceptar']
    });
    alert.present();
  }





}
