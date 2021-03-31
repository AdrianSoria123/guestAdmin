import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-admin-perfil-empleado',
  templateUrl: 'admin-perfil-empleado.html',
})
export class AdminPerfilEmpleadoPage {
  uid: any;
  _userEmpleado: any = {};


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public Fiauth: AngularFireAuth,
              public toastCtrl: ToastController,

      ) {
    this.uid = this.navParams.get('uid');
    console.log('info empleado perfil', this.uid);
    this.authProvider.getUserAdmins(this.uid).subscribe(s => {
      this._userEmpleado = s;
      console.log('empleado info', this._userEmpleado);               
    })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPerfilEmpleadoPage');
  }

  changePass(email){
    var auth = this.Fiauth.auth;
     email;
       // Email sent.
       if(confirm('¿Estás seguro de que quieres restablecer la contraseña?')){
       auth.sendPasswordResetEmail(email);
        this.mostrar_toast('Se ha enviado un correo para el cambio/restablecimiento de contraseña a '+ email);
   
           // console.log('Correo enviado a '+ email);
     }
   }
   mostrar_toast( mensaje: string,  ){

    const toast = this.toastCtrl.create({
       message: mensaje,
       duration: 3000
     }).present();
  }

  logout() {
  	this.authProvider.logout();
  	this.navCtrl.setRoot(LoginPage);
  }
}
