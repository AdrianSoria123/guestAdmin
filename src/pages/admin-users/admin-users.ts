import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AngularFireAuth } from 'angularfire2/auth';
//import { HomePage } from '../../pages/home/home';
import { AdminUsersGuestPage } from '../admin-users-guest/admin-users-guest';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-admin-users',
  templateUrl: 'admin-users.html',
})
export class AdminUsersPage {

  credentials: any = {
        name: '',
        email: '',
        password: '',
        type: ''
    }
    uidSucursal: any;
    sucursal: any;
    sucursales: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private viewCtrl: ViewController,
    public userProvider: UserProvider,
    public afs: AngularFirestore,
    public firebase: AngularFireAuth,

    ) {
        this.sucursal = this.firebase.auth.currentUser;
        if(this.sucursal != null ){
          this.uidSucursal=this.sucursal.uid
          //Cuando es un usuario se saca el id de la sucursal ala que pertenece
           this.afs.collection('users', ref => ref.where('uid', '==', this.sucursal.uid)).valueChanges().subscribe(data => {
           this.sucursales = data;
             this.sucursales.forEach(element => {
               const tipoUser = element.type;
               const uidSucursal = element.uidSucursal;
               if(tipoUser == 'coordinacion'  || tipoUser == 'rp' || tipoUser == 'capitan_mesero'){
                  this.uidSucursal = uidSucursal;
               }
            });
            });
     }
   }

  register() {
        var toaster = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom'
        });
        if (this.credentials.email == '' || this.credentials.password == '' || this.credentials.name == '' || this.credentials.type == '') {
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
            this.userProvider.newRegister(this.credentials, this.uidSucursal);
            // this.navCtrl.pop();newRegister
            this.cerrar_modal();
        }
        //this.navCtrl.push(AdminUsersGuestPage);
    }
    cerrar_modal(){
        this.viewCtrl.dismiss();
      }

}
