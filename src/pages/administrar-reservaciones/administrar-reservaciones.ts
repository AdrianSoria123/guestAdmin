import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { GestionReservacionesProvider } from '../../providers/gestion-reservaciones/gestion-reservaciones';
import { ReservacionProvider } from "../../providers/reservacion/reservacion";
import { AngularFirestore } from '@angular/fire/firestore';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-administrar-reservaciones',
  templateUrl: 'administrar-reservaciones.html',
})
export class AdministrarReservacionesPage {

  fecha: Date = new Date();
  uidSucursal: any;
  reservaciones: any;
  historial: any;
  res: boolean = false;
  sucursales: any;
  usuarios: any;
  area: any = {};
  zona: any = {};
  reserv: any = {};
  estatus: boolean = true;
  estatus2: boolean = true;
  mesas: any[];
  mesas2: any[];
  imagenList: any[];
  estatusReser: any;
  sucursales2: any;
  uidSucursal2: any;
  compartidas: any;
  totalReserv: any;
  productos: any[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              public _providerReserva: ReservacionProvider,
              public afs: AngularFirestore,
              public _gestionReser: GestionReservacionesProvider) {

  }

  ionViewDidLoad() {
  this.uidSucursal = this.navParams.get("uidSucursal");
  this.getReservaciones(this.uidSucursal);
  this.getUsuarios();
  this.getMesas2(this.uidSucursal);
  this.getImgSucursal(this.uidSucursal);
    //Cuando es un usuario se saca el id de la sucursal ala que pertenece
     this.afs.collection('users', ref => ref.where('uid', '==', this.uidSucursal)).valueChanges().subscribe(data => {
     this.sucursales2 = data;
       this.sucursales2.forEach(element => {
         this.uidSucursal2 = element.uidSucursal;
         this.getReservaciones(this.uidSucursal2);
         this.getMesas2(this.uidSucursal2);
         this.getImgSucursal(this.uidSucursal2);
       });
      });
  }

  getCompartidas(idR){
    console.log('compartidas ts: '+idR);
      //let idR= "EOAolnpwc9GRuQt8zLpf";
    this._gestionReser.getCompartidas(idR).subscribe(reserv => {
      this.compartidas = reserv;
      console.log("Compartidas de reeseva: ", this.compartidas);
    });
    this.getUsuarios();
  }

  getReservaciones(idSucursal) {
    const date = moment().format("YYYY-MM-DD");
    const fecha = moment(date).format('x');
    console.log("Fecha numeros: ",fecha);
    console.log("Fecha: ", date);
    this._gestionReser.getReservaciones(idSucursal, fecha).subscribe(reserv => {
      this.reservaciones = reserv;
      console.log("Estas son las reservacionesXs: ", this.reservaciones);
    });
  }

  getUsuarios() {
    this._gestionReser.getUsuarios().subscribe(users => {
      this.usuarios = users;
      console.log("Estos son los usuarios: ", this.usuarios);
    });
  }

  Agendar(){
    alert('Si entra');
  }

  modStatus_cancelacion(idReserv, idSucursal){
    console.log("moStatus_cancelacion",idReserv);
    console.log(idSucursal);

    let modal = this.modalCtrl.create("Modalstatus_cancelacionPage",{  
      idReserv: idReserv,
      idSucursal: idSucursal,
    });
    modal.present(); 
}

  consultaReservacion(idReser){
    this.estatus = false;
    this.estatus2=true;
    this._gestionReser.getReservacion(idReser).subscribe(res=>{
      this.reserv = res;
      console.log("Esta es la reservación: ",this.reserv);

      let idArea = this.reserv.idArea;
      this._gestionReser.getArea(idArea).subscribe(area=> {
        this.area = area;
        console.log("Estos son las areas: ", this.area);
      });

      let idZona = this.reserv.idZona;
      this._gestionReser.getZona(idZona).subscribe(zona => {
        this.zona = zona;
        console.log("Estos son las zonas: ", this.zona);
      });

      this.getMesas(idZona);

      this.consultaHistorial(this.reserv.idUsuario);
      this.getProductos(idReser);
    });
    this.getCompartidas(idReser);
  }

  verCroquis(){
      this.estatus2=false;
      this.estatus=true;
    //console.log("administrar-reservacion.ts id->",idReservacion);
  }

  consultaHistorial(idUsuario){
    this._gestionReser.getHistorial(idUsuario).subscribe(history => {
      this.historial = history;
      if (this.historial.length!=0) {
        this.res = true;
      }else{
        this.res= false;
      }
      console.log("Estas son las reservaciones completas: ", this.historial);
    });

    this.consultaSucursales();
  }

  consultaSucursales(){
    this._gestionReser.getSucursales().subscribe(sucursales => {
      this.sucursales = sucursales;
      console.log("Estas son las sucursales: ", this.sucursales);
    });
  }

  modZonaMesa(idReserv, idSucursal, idArea, idZona){
    let modal = this.modalCtrl.create("ModiareazonaPage",{
      idReserv: idReserv,
      idSucursal: idSucursal,
      idArea: idArea,
      idZona: idZona
    });
    modal.present();
  }
  modStatus(idReserv, idSucursal){

      console.log("moStatus",idReserv);
      console.log(idSucursal);

      let modal = this.modalCtrl.create("ModalstatusPage",{
        idReserv: idReserv,
        idSucursal: idSucursal,
      });
      modal.present();
  }

  asignarMesa(idReserv,idZona){
    let modal = this.modalCtrl.create("ModalmesasPage",{
      idReserv: idReserv,
      idZona: idZona
    });
    modal.present();
  }
  Aceptar(idReserv){
    //console.log("Este es el id: ", idReserv);
    //this._gestionReser.aceptarReservacion(idReserv);
    //Obtener el estatus de la reservacion si es creada normal o CreadaCompartida
    this._gestionReser.getEstatusReser(idReserv).subscribe(reser => {
      this.estatusReser = reser;
        this.estatusReser.forEach(data => {
          if(data.estatus=='Creando'){
            console.log("Este es el id creada: ", idReserv);
            this._gestionReser.aceptarReservacion(idReserv);
          }
          if(data.estatus=='CreadaCompartida'){
            console.log("Este es el id compartida: ", idReserv);
              console.log("ejecutocompartida: ", idReserv);
            this._gestionReser.aceptarReservacionCompartida(idReserv);
          }

        });
    });
  }

  Cancelar(idReserv){
    console.log("Este es el id: ", idReserv);
    this._gestionReser.cancelarReservacion(idReserv);
  }

  getMesas(idZona) {
    this._gestionReser.getMesas(idZona).subscribe(mesas => {
      this.mesas = mesas;
      console.log("mesas JAJA: ", this.mesas);
    });
  }

  getMesas2(idSucursal) {
    console.log("getMesas2sucursal", idSucursal);
    this._providerReserva.getMesas2(idSucursal).subscribe(mesas2 => {
      console.log("Mesas2", mesas2);
      this.mesas2 = mesas2;
    });
  }

  getProductos(idReserv) {
    let total=0;
    console.log("getProductos id reserva", idReserv);
     this._providerReserva.getProductos(idReserv).subscribe(productos => {
       console.log("productos: ", productos);
       this.productos = productos;

       productos.forEach(function (value) {
        console.log('foreachIonci' +value.total );
        total =total+value.total;
        
      });
      console.log('totalreserva: '+total);
      this.totalReserv=total;
       
     });
  }

  getImgSucursal(uid){

      this._providerReserva.getImagenSucursal(uid).subscribe(res=>{
        this.imagenList=res;
        console.log("imagenes123",this.imagenList);
          res.forEach(function (value) {
            //console.log("imagenId",value.myId);
            console.log("forech urlImg",value.imagenes);
            //this.imgSucursal=value.imagenes;
            //console.log("Url", this.imgSucursal);
        });
      });
}

}
