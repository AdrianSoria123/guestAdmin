import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonitoreoReservasProvider } from '../../providers/monitoreo-reservas/monitoreo-reservas';
import { BarcodeScanner , BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { AdminDeMonUserPage } from '../admin-de-mon-user/admin-de-mon-user';
import { AdminLeeQrPage } from '../admin-lee-qr/admin-lee-qr';
import { AdminReservacionDetallePage } from '../admin-reservacion-detalle/admin-reservacion-detalle';
import { AngularFirestore } from '@angular/fire/firestore';


@IonicPage()
@Component({
  selector: 'page-admin-monitear-reserv',
  templateUrl: 'admin-monitear-reserv.html',
})
export class AdminMonitearReservPage {
  options: BarcodeScannerOptions;
  encodText: string = '';
  encodeData: any = {};
  scannedData: any = {};

  reservaciones: any = [];
  clientes: any;
  datosQr: any;
  menu: any;
  formatoFecha: any;
  sucursales: any;
  reservacionesAcep: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    public monRes: MonitoreoReservasProvider,
    private barcodeScanner: BarcodeScanner
    ) {
      //recibe parametro de la reservacion
      this.menu = this.navParams.get("menu");
      console.log(this.menu);
  }

  ionViewDidLoad() {
    this.getAllReservacione();
    this.getClientes();
  }

  getAllReservacione() {
    var dateObj = new Date()
    var anio = dateObj.getFullYear().toString();
    var mes = dateObj.getMonth().toString();
    var dia = dateObj.getDate();
    var mesArray = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    if (dia >= 1 && dia <= 9){
       var diaCero='0'+dia;
       this.formatoFecha = anio + '-' + mesArray[mes] + '-' + diaCero;
    }else{
    this.formatoFecha = anio + '-' + mesArray[mes] + '-' + dia;
    }
    console.log("fecha actual");
    console.log(this.formatoFecha);
    const id = localStorage.getItem('uidSucursal');
    //Cuando es un usuario se saca el id de la sucursal ala que pertenece
     this.afs.collection('users', ref => ref.where('uid', '==', id)).valueChanges().subscribe(data => {
     this.sucursales = data;
       this.sucursales.forEach(element => {
         const uidSucursal = element.uidSucursal;
         this.monRes.getReservaciones(uidSucursal,this.formatoFecha).subscribe( reser => {
           this.reservaciones = reser;
           console.log('reservaciones', reser);
         })
         this.monRes.getReservacionesAcepCom(uidSucursal,this.formatoFecha).subscribe( reser => {
           this.reservacionesAcep = reser;
           console.log('reservaciones', reser);
         })
       });
      });
    this.monRes.getReservaciones(id,this.formatoFecha).subscribe( reser => {
      this.reservaciones = reser;
      console.log('reservaciones', reser);
    })
    this.monRes.getReservacionesAcepCom(id,this.formatoFecha).subscribe( reser => {
      this.reservacionesAcep = reser;
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
  //aceptarReserv(idReservacion) {
    //this.navCtrl.push(AdminLeeQrPage, {idReservacion:idReservacion});
  //}

  scan() {
    this.options = {
      prompt: 'Procesando Reservación'
    };
    this.barcodeScanner.scan(this.options).then((data) => {
      this.scannedData = data;
      this.datosQr=data.text;
      //console.log('this.datosQr');
      //console.log(this.datosQr);
     //obtener los datos del QR del cliente y sacarlo de uno por uno en la variable que manda el scanner
       //const dataCode = JSON.parse(this.datosQr);
       //console.log('dataCode: ', dataCode.idReservacion);
       //console.log('dataCode: ', dataCode.total);
       //console.log('dataCode: ', dataCode.idUsuario);
       //console.log('dataCode: ', dataCode.tarjeta);
      const datosQr = this.datosQr;
      this.navCtrl.push(AdminLeeQrPage, {datosQr:datosQr});
      //alert('La reservación cambio de estatus');
    }, (err) => {
      console.log('Error', err);
    })
  }
}
