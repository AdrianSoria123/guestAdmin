import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Platform, MenuController, Nav } from "ionic-angular";
import { AdminSucursalListPage } from '../admin-sucursal-list/admin-sucursal-list';
// import { AdminSucursalSubirPage } from '../admin-sucursal-subir/admin-sucursal-subir';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { AdministrarReservacionesPage } from '../administrar-reservaciones/administrar-reservaciones';
import { AdminMonitearReservPage } from '../admin-monitear-reserv/admin-monitear-reserv';
import { AdminHistorialReservacionesPage } from '../admin-historial-reservaciones/admin-historial-reservaciones';
import { CuponesSucursalPage } from '../cupones-sucursal/cupones-sucursal';
import { CiudadEstablecimientoPage } from '../ciudad-establecimiento/ciudad-establecimiento';
import { AdminLoginPage } from '../admin-login/admin-login';
import { CuentasPage } from '../cuentas/cuentas';

@IonicPage()
@Component({
  selector: "page-admin-menu-reservacion",
  templateUrl: "admin-menu-reservacion.html"
})
export class AdminMenuReservacionPage {
  email: string;
  displayName: string;
  uid: string;
  sucursal: any;
  _sucursal: any = {};
  _userAdmin: any = {};
  _sucursalEmpleado: any = {};
  usertipo:any;

  constructor(
    public navCtrl: NavController,
    public firebase: AngularFireAuth,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public authProvider: AuthProvider
  ) {
    this.sucursal = this.firebase.auth.currentUser;
    //this.sucursal= '6J7V17w785B8ez4vdvIt';
    if (this.sucursal != null) {
      this.uid = this.sucursal.uid; //'a7btYItzhhhtUzRphc2EWuqGzE12';
      this.email = this.sucursal.email;
      // photoURL = sucursal.photoURL;
      // uid = sucursal.uid;
      // Recibiendo información del usuario/sucursal
      console.log("uid sucursal", this.uid);
      this.authProvider.getUserBd(this.uid).subscribe(s => {
        console.log('S:',s);
        this._sucursal = s;
        console.log('_sucursal', this._sucursal);
      })
      // Traemos el perfil del empleado de la tabla users
      this.authProvider.getUserAdmins(this.uid).subscribe(s => {
        this._userAdmin = s;
        //this._userAdmin='a7btYItzhhhtUzRphc2EWuqGzE12';
        console.log('_userAdmin', this._userAdmin);
        // Extraemos el uid de su sucursal
       const uidSucursal = this.uid;
       console.log('sucursal empleado', uidSucursal);
      // Traemos la informacion de la sucursal del empleado
      this.authProvider.getUserBd(uidSucursal).subscribe(s => {
        this._sucursalEmpleado = s;
        console.log('_sucursalEmpleado', this._sucursalEmpleado);
        // Guardamos el uidSucursal del empleado en el localStorage
        localStorage.setItem('uidSucursal', uidSucursal);
      });
      });
        console.log("_sucursal", this._sucursal);
      }

    }


  ionViewDidLoad() {
    console.log("ionViewDidLoad AdminMenuReservacionPage");
    this.getUserAdmins();
  }

  getUserAdmins() {
    // Traemos el perfil del empleado de la tabla users
    this.authProvider.getUserAdmins(this.uid).subscribe(s => {
      this._userAdmin = s;
      //this._userAdmin= 'a7btYItzhhhtUzRphc2EWuqGzE12';
      const uidSucursal = this.uid;
      console.log("_userAdmin", this._userAdmin);
      // Extraemos el uid de su sucursala
      console.log("sucursal empleado", uidSucursal);
      // Traemos la informacion de la sucursal del empleado
      this.authProvider.getUserBd(uidSucursal).subscribe(s => {
        this._sucursalEmpleado = s;
        console.log("_sucursalEmpleado", this._sucursalEmpleado);
      });
    });
  }

  adminReservaciones() {
    this.navCtrl.push(AdministrarReservacionesPage, {
      uidSucursal: this.sucursal.uid
    });
  }

  goMonitorear() {
    this.navCtrl.push(AdminMonitearReservPage);
  }

  goSucursal() {
    this.usertipo='master';
    console.log(this.usertipo);
    this.navCtrl.push(AdminSucursalListPage,{usertipo: this.usertipo});
  }
  //ir a pagina de cupones
  goCupones() {
    this.navCtrl.push(CuponesSucursalPage);
  }
  //ir a pagina de ciudades
  goCiudades() {
    this.navCtrl.push(CiudadEstablecimientoPage);
  }
  //ir a pagina de historial
  goReservacionHistorial() {
    this.navCtrl.push(AdminHistorialReservacionesPage);
  }
  goConsumo() {
    console.log("consumo sucUID",this.sucursal.uid);
    var obj=[{uid: this.sucursal.uid}]
    this.navCtrl.push(CuentasPage, { uidSucursal: this.sucursal.uid } );
  }
  
  salir() {
      localStorage.setItem("isLogin", 'false');
      this.navCtrl.setRoot(AdminLoginPage);
      this.menuCtrl.close();
  }
  
}
