import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform, MenuController, Nav } from "ionic-angular";
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from "../../pages/login/login";
import { AdminEventoHomePage } from "../../pages/admin-evento-home/admin-evento-home";
import { AdminCartaHomePage } from '../../pages/admin-carta-home/admin-carta-home';
import { AdminUsersListPage } from '../admin-users-list/admin-users-list';
//import { AdminUsersPage } from "../../pages/admin-users/admin-users";
import { AdminMenuReservacionPage } from '../admin-menu-reservacion/admin-menu-reservacion';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';
import { AdminSucursalPerfilPage } from '../admin-sucursal-perfil/admin-sucursal-perfil';
import { MonitoreoReservasProvider } from '../../providers/monitoreo-reservas/monitoreo-reservas';
//import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { PushNotiProvider } from '../../providers/push-noti/push-noti';
import { AngularFirestore } from '@angular/fire/firestore';
import { AdminPerfilEmpleadoPage } from '../admin-perfil-empleado/admin-perfil-empleado';
import { AdminMonitearReservPage } from '../admin-monitear-reserv/admin-monitear-reserv';
import { AdminReservacionesCursoPage } from '../admin-reservaciones-curso/admin-reservaciones-curso';
import { AdminSucursalListPage } from '../admin-sucursal-list/admin-sucursal-list';
import { AdminLoginPage } from '../admin-login/admin-login';
import { AdminUsersGuestPage } from '../admin-users-guest/admin-users-guest';
import { CorteHistorialPage } from '../corte-historial/corte-historial';

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  //sucursal: Credenciales = {};
  //data: any = {};
  email: string;
  displayName: string;
  uid: string;
  sucursal: any;
  _sucursal: any = {};
  _userEmpleado: any = {};
  reservaciones: string = "reserv";
  resSucursal: any;
  totalReservaciones: any;
  resSucursal2: any;
  totalReservaciones2: any;
  menu: any;
  formatoFecha: any;
  resultadoSucursales: any;
  totalSucursales: any;
  admins: any;
  totalEmpleados: any;
  usertipo: any;
  sucursales: any;
  resSucursalAcepCom: any;
  totalAcepCom: any;

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public navParams: NavParams,
      public authProvider: AuthProvider,
      public sucProv: SucursalAltaProvider,
      public firebase: AngularFireAuth,
      public _providerPushNoti: PushNotiProvider,
      public afs: AngularFirestore,
      public monRes: MonitoreoReservasProvider
      ) {
    this.sucursal = this.firebase.auth.currentUser;
    console.log("Esta es la sucursal: ", this.sucursal);
    this.menu="menu";
    if(this.sucursal != null ){
      //this.uid = localStorage.getItem('uidSucursal');
      this.uid = this.sucursal.uid;
      this.email = this.sucursal.email;
      console.log('sucursalid', this.uid);
      // photoURL = sucursal.photoURL;
      // uid = sucursal.uid;
      // Recibiendo información del usuario=sucursal
      this.authProvider.getUserBd(this.uid).subscribe(s => {
        this._sucursal = s;
        console.log('sucursal', this._sucursal);
      })
      // Traemos la información del empleado
      this.authProvider.getUserAdmins(this.uid).subscribe(s => {
        this._userEmpleado = s;
          console.log('empleado uid', this.uid);
        console.log('empleado info', this._userEmpleado);
      })
      //obtener fecha actual
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
      //reservaciones proximas estatus aceptado
      this.monRes.getReservaciones(this.uid,this.formatoFecha).subscribe(res => {
        this.resSucursal = res;
        //reservaciones  proximas estatus aceptadocompartida
        this.monRes.getReservacionesAcepCom(this.uid,this.formatoFecha).subscribe(res3 => {
          this.resSucursalAcepCom = res3;
          this.totalAcepCom = this.resSucursalAcepCom.length;
          this.totalReservaciones = this.resSucursal.length + this.totalAcepCom;
            console.log('total reservaciones acep', this.totalReservaciones);
        })
      })

      //reservaciones en curso
      this.monRes.getReservacionesCurso(this.uid,this.formatoFecha).subscribe(res2 => {
        this.resSucursal2 = res2;
        this.totalReservaciones2 = this.resSucursal2.length;
        console.log('reservaciones', this.resSucursal2);
        console.log('total reservaciones', this.totalReservaciones2);
      })
      this.afs.collection('users', ref => ref.where('uid', '==', this.uid)).valueChanges().subscribe(data => {
      this.sucursales = data;
        this.sucursales.forEach(element => {
          const uidSucursal = element.uidSucursal;
          //reservaciones proximas
          this.monRes.getReservaciones(uidSucursal,this.formatoFecha).subscribe(res => {
            this.resSucursal = res;
            this.totalReservaciones = this.resSucursal.length;
            console.log('reservaciones', this.resSucursal);
            console.log('total reservaciones', this.totalReservaciones);
          })
          //reservaciones en curso
          this.monRes.getReservacionesCurso(uidSucursal,this.formatoFecha).subscribe(res2 => {
            this.resSucursal2 = res2;
            this.totalReservaciones2 = this.resSucursal2.length;
            console.log('reservaciones', this.resSucursal2);
            console.log('total reservaciones', this.totalReservaciones2);
          })
        });
       });

    }
    console.log('Este es el UID de la sucursal '+this.uid);
    console.log('Este es el correo de la sucursal '+this.email);
    //total de Sucursales
    this.afs.collection('sucursales', ref => ref.where('status', '==', 'activo')).valueChanges().subscribe(data => {
      this.resultadoSucursales = data;
      console.log('sucursales activas '+this.resultadoSucursales);
      this.totalSucursales= this.resultadoSucursales.length;
    })
    //total de Usuarios empleados
    this.afs.collection('users', ref => ref.where('type', '==', 'e'))
    .valueChanges().subscribe( u => {
      this.admins = u;
      console.log('admins', this.admins);
      this.totalEmpleados = this.admins.length;
    })
  }

  goMonitorear(menu) {
    this.navCtrl.push(AdminMonitearReservPage,{ menu:menu });
  }
  goMonitorearCurso() {
    this.navCtrl.push(AdminReservacionesCursoPage);
  }
  ionViewDidLoad() {
    console.log('HOME PAGE');
    this._providerPushNoti.init_push_noti();
  }

  logout() {
  	this.authProvider.logout();
  	this.navCtrl.setRoot(LoginPage);
  }
goUsers(){
  this.navCtrl.push(AdminUsersListPage);
}
 goEventos(){
   this.navCtrl.push(AdminEventoHomePage);
 }
 goCarta(){
   this.navCtrl.push(AdminCartaHomePage);
 }
 goReservacion(){
  this.navCtrl.push(AdminMenuReservacionPage);
 }
 goPerfilEmpleado(uid){
  this.navCtrl.push(AdminPerfilEmpleadoPage, { uid:uid });
 }
 goUsuarioHis(){

 }
 goPerfilSucursal(uid){
   console.log('aqui uid', uid);
  this.navCtrl.push(AdminSucursalPerfilPage, {uid:uid});
 }
 goSucursal() {
   this.usertipo='master';
   console.log(this.usertipo);
   this.navCtrl.push(AdminSucursalListPage,{usertipo: this.usertipo});
 }
 goListaUsuariosEmpleados(home) {
   console.log('aqui home', home);
   this.navCtrl.push(AdminUsersGuestPage, {home:home});
 }
 goCorteHistorial(x){
  console.log('Historial-Corte', x);
  this.navCtrl.push(CorteHistorialPage, this.sucProv.selectedSucursalItem = Object.assign({}, x))
}

 salir() {
     localStorage.setItem("isLogin", 'false');
     this.navCtrl.setRoot(AdminLoginPage);
     this.menuCtrl.close();
 }


}
