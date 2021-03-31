import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, Nav } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { AdminLoginPage } from "../pages/admin-login/admin-login";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";
import { NosotrosPage } from "../pages/nosotros/nosotros";
import { CartaPage } from "../pages/carta/carta";
import { Reservacion_1Page } from "../pages/reservacion-1/reservacion-1";
import { PerfilPage } from "../pages/perfil/perfil";
import { HistorialPage } from "../pages/historial/historial";
import { AngularFireAuth } from "angularfire2/auth";
import { UsuarioProvider, Credenciales } from "../providers/usuario/usuario";
import { ResumenPage } from '../pages/resumen/resumen';
import { MisReservacionesPage } from '../pages/mis-reservaciones/mis-reservaciones';


@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  user: Credenciales = {};

  rootPage: any = AdminLoginPage;
  home = TabsPage;
  nosotros = NosotrosPage;
  carta = CartaPage;
  perfil = PerfilPage;
  historial = HistorialPage;
  reservacion = Reservacion_1Page;
  reservaciones = MisReservacionesPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public menuCtrl: MenuController,
    public usuarioProv: UsuarioProvider,
    private afAuth: AngularFireAuth
  ) {
    console.log('esta es la info del usuario');
    console.log(this.usuarioProv.usuario.nombre);
    this.user = this.usuarioProv.usuario;

    platform.ready().then(() => {
      if (
        localStorage.getItem("isLogin") == "false") {
        this.nav.setRoot(AdminLoginPage);
      }
      // else if (localStorage.getItem("reservacion") == "true") {
      //   this.nav.setRoot(ResumenPage, {
      //     idReservacion: localStorage.getItem("idReservacion"),
      //     idSucursal: localStorage.getItem("idSucursal"),
      //     uid: localStorage.getItem("uidEvento")
      //   });
      // }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  //Menu de la aplicacion
  irHome(home: any) {
    console.log(home);
    this.rootPage = home;
    this.menuCtrl.close();
  }
  irNosotros(nosotros: any) {
    console.log(nosotros);
    this.rootPage = nosotros;
    this.menuCtrl.close();
  }

  irPerfil(perfil: any) {
    console.log(perfil);
    this.rootPage = perfil;
    this.menuCtrl.close();
  }

  irCarta(carta: any) {
    console.log(carta);
    this.rootPage = carta;
    this.menuCtrl.close();
  }

  irHistorial(historial: any) {
    console.log(historial);
    this.rootPage = historial;
    this.menuCtrl.close();
  }

  irReservacion(reservacion: any) {
    console.log(reservacion);
    this.rootPage = reservacion;
    this.menuCtrl.close();
  }

  irMisreservaciones( reservaciones:any ){
    console.log( reservaciones );
    this.rootPage= reservaciones;
    this.menuCtrl.close();
    }

  irLogin(rootPage) {
    console.log(rootPage);
    this.rootPage = rootPage;
    this.menuCtrl.close();
  }
  salir() {
    //this.afAuth.auth.signOut().then(res => {
      //this.usuarioProv.usuario = {};
      localStorage.setItem("isLogin", 'false');
      this.nav.setRoot(AdminLoginPage);
      this.menuCtrl.close();
    //});
  }
}
