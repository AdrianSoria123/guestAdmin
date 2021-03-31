import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MonitoreoReservasProvider } from '../../providers/monitoreo-reservas/monitoreo-reservas';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-admin-lee-qr',
  templateUrl: 'admin-lee-qr.html',
})
export class AdminLeeQrPage {
idReservacion: any;
idReservacion2: any;
montoReservacion: any;
idTarjeta: any;
reservacion: any = {};
cliente: any = {};
area: any = {};
zona: any = {};
mesas: any;
evento: any = {};
productos: any;
datosQrRecibidos: any;
infotarjeta: any = {};
numTarjeta: any;
mesExpiracion: any;
anioExpiracion: any;
cvc: any;
idCompartir: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afs: AngularFirestore,
              public servMon: MonitoreoReservasProvider,
              public user: AuthProvider,
              public alertCtrl: AlertController,
              ) {

    //this.idReservacion = this.navParams.get('idReservacion');
    //console.log('id', this.idReservacion);
    //alert('reservacionacep'+ this.idReservacion);
    //console.log('id', this.idReservacion);
      this.datosQrRecibidos = this.navParams.get('datosQr');
        const dataCode = JSON.parse(this.datosQrRecibidos);
        this.idReservacion2 = dataCode.idReservacion;
        this.idCompartir = dataCode.idCompartir;
        //alert(this.idCompartir);
        //Cambiar el estatus a pagado cuando ya se escanea y se verifico el pago
        //si la reservacion es normal cambiar el estatus principal a pagando.
        if(this.idCompartir == undefined){
         this.afs.collection('reservaciones').doc(this.idReservacion2).update({
          estatus: 'Pagando'
         });
         //alert('Reservación pagada: Acceso permitido');
         let alerta = this.alertCtrl.create({
    //  message:
      //  "Reservación pagada: Acesso permitido",
      buttons: [
        {
          text: "Reservación pagada: Acesso permitido! Aceptar",
          handler: () => {
            console.log("Buy clicked");
          }
        }
      ]
    });
    alerta.present();
       }
       //Cambiar el estatus a pagado cuando ya se escanea y se verifico el pago
       //si la reservacion es compartida cambiar el estatus en tabla compartida de cada persona que comparte.
       if(this.idCompartir != undefined){
       //Cambiar el estatus a pagado cuando ya se escanea y se verifico el pago
        this.afs.collection('compartidas').doc(this.idCompartir).update({
         estatus_escaneo: 'OK'
        });
        //alert('Reservación pagada: Acceso permitido');
        let alerta = this.alertCtrl.create({
    // message:
    //   "Reservación pagada: Acesso permitido",
     buttons: [
       {
         text: "Reservación pagada: Acesso permitido! Aceptar",
         handler: () => {
           console.log("Buy clicked");
         }
       }
     ]
   });
   alerta.present();
      }
        //this.montoReservacion=dataCode.total;
        //this.idTarjeta=dataCode.tarjeta;
        // Datos de la reservacion
        this.servMon.getReservacion(this.idReservacion2).subscribe( reserv =>{
          this.reservacion = reserv;
          // Extraemos uid del usuario
          const uid = this.reservacion.idUsuario;
          this.infoClient(uid);
          // Extraemos el id del area
          const uidArea = this.reservacion.idArea;
          this.infoArea(uidArea);
          // Extraemos el id de la zona
          const uidZona = this.reservacion.idZona;
          this.infoZona(uidZona);
          // Enviamos el idReservacion a reservaciones mesas
          this.getAllTables(this.idReservacion2);
          // Extraemos el id del evento
          const uidEvento = this.reservacion.idevento;
          this.infoEvento(uidEvento);
          // Enviamos el idReservacion a productos
          this.getProducts(this.idReservacion2);
        });
        //this.servMon.getDatosTarjeta(this.idTarjeta).subscribe( tarjeta =>{
        //  this.infotarjeta = tarjeta;
        //  this.numTarjeta = this.infotarjeta.numTarjeta;
        //  this.mesExpiracion = this.infotarjeta.mesExpiracion;
        //  this.anioExpiracion = this.infotarjeta.anioExpiracion;
        //  this.cvc = this.infotarjeta.cvc;
          //console.log('datos de la tarjeta y monto');
          //console.log(this.idTarjeta,this.numTarjeta,  this.mesExpiracion,this.anioExpiracion,this.cvc,this.montoReservacion);
          //mandar datos de la tarjeta
          //this.servMon.cambiaPagando(this.idReservacion2,this.numTarjeta,this.mesExpiracion,this.anioExpiracion,this.cvc,this.montoReservacion);
        //});

  }

  ionViewDidLoad() {
  }

  infoClient(uid) {
    this.user.getUserAdmins(uid).subscribe( c => {
      this.cliente = c;
      console.log('cliente', this.cliente);
    })
  }
  infoArea(uid) {
    this.servMon.getArea(uid).subscribe( a => {
      this.area = a;
      console.log('area', this.area);
    })
  }
  infoZona(uid) {
    this.servMon.getZona(uid).subscribe( a => {
      this.zona = a;
      console.log('zona', this.zona);
    })
  }
  getAllTables(id) {
    this.servMon.getAllMesas(id).then(m => {
      this.mesas = m;
      console.log('mesas', this.mesas);
    })
  }
  infoEvento(uid) {
    this.servMon.getEvento(uid).subscribe( e => {
      this.evento = e;
      console.log('evento', e);
    })
  }
  getProducts(uid) {
    this.servMon.getAllProductos(uid).then( p => {
      this.productos = p;
      console.log('carta', p);
    })
  }
  // updateRes() {
  //   this.servMon.cambiaPagando();
  // }

}
