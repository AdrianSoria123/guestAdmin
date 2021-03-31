import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from "../login/login";
import { UsuarioProvider, Credenciales } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  user: Credenciales = {};

  constructor(public navCtrl: NavController,
              public usuarioProv: UsuarioProvider,
              private afAuth: AngularFireAuth) {

            console.log( this.usuarioProv.usuario );
            this.user = this.usuarioProv.usuario;

            this.afAuth.authState.subscribe(user =>{
              console.log('AFAUTH!!');
              console.log( JSON.stringify(user));
            });
  }

  salir(){
    this.afAuth.auth.signOut().then( res => {
      this.usuarioProv.usuario = {};
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
