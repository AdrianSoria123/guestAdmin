import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-admin-sucursal-subir',
  templateUrl: 'admin-sucursal-subir.html',
})
export class AdminSucursalSubirPage {
   ciudades: any;
  credentials: any = {
    sucursal: '',
    nombrecontacto: '',
    direccion: '',
    email: '',
    password: '',
    status: 'activo',
    tipo: '',
    ciudad: '',
    telefono:''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public ProSuc: SucursalAltaProvider,
    public afs: AngularFirestore
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalSubirPage');
    this.cargarCiudades();
  }

  //funcion cargar info de las sucursales
  cargarCiudades(){
    this.afs.collection('ciudades').valueChanges().subscribe( ciu => {
      this.ciudades = ciu;
    });
  }


  registrar() {
    console.log('datos ciudad',this.credentials);
    var toaster = this.toastCtrl.create({
        duration: 3000,
        position: 'bottom'
    });
    if (this.credentials.email == '' || this.credentials.password == '' || this.credentials.name == '' || this.credentials.sucursal == '' || this.credentials.direccion == '' || this.credentials.tipo == '' || this.credentials.ciudad == '') {
        toaster.setMessage('Todos los campos son requeridos');
        toaster.present();
    } else if (this.credentials.password.length < 7) {
        toaster.setMessage('La contraseña no es sufucientemente larga, intenta con más de 7 caracteres');
        toaster.present();
    } else {
        let loader = this.loadingCtrl.create({
            content: 'Por favor, espere'
        });
        // loader.present();
        this.ProSuc.newRegister(this.credentials);
        // this.navCtrl.pop();
        this.cerrar_modal();
    }
}
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }
}
