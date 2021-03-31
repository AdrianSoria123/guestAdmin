import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SucursalAltaProvider, Credenciales } from '../../providers/sucursal-alta/sucursal-alta';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AdminSucursalEditperfilPage } from '../admin-sucursal-editperfil/admin-sucursal-editperfil';
import { AdminSucursalEditperfilImagenPage } from '../admin-sucursal-editperfil-imagen/admin-sucursal-editperfil-imagen';
// import { AdminSucursalCroquisPage } from '../admin-sucursal-croquis/admin-sucursal-croquis';


@IonicPage()
@Component({
  selector: 'page-admin-sucursal-croquis',
  templateUrl: 'admin-sucursal-croquis.html',
})
export class AdminSucursalCroquisPage {
  sucursal: any = { uid: null, contacto: null , direccion: null, displayName: null, email: null, photoURL: null, status: null, tel: null, tipo: null}
  uid: null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public SucProv: SucursalAltaProvider,
              public authProvider: AuthProvider) {

    this.sucursal.uid = navParams.get('idSucursal');
    console.log("Este es el id: ",this.sucursal.uid);
    SucProv.getSucursal(this.sucursal.uid).subscribe(sucursal =>{
        this.sucursal = sucursal;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalCroquisPage');
  }

}
