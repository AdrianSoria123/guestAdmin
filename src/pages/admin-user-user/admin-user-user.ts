import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from '@angular/fire/database';
import { AdminUserDetailPage } from '../admin-user-detail/admin-user-detail';
import { UsuarioProvider } from "../../providers/usuario/usuario";
// import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-admin-user-user',
  templateUrl: 'admin-user-user.html',
})
export class AdminUserUserPage {
  users: any;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public DB: AngularFireDatabase,
     public actionSheet: ActionSheetController,
     public _up: UsuarioProvider, 
     public afs: AngularFirestore
     ) {
       this.afs.collection('users').valueChanges().subscribe( u => {
         this.users = u;
       });
        // this.users = this.DB.list('users').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserUserPage');
  }
  selectUsuario(uid){
    this.actionSheet.create({
      title: 'Acciones',
      buttons:[
        {
          text: 'Ver más',
          handler:()=>{
            this.navCtrl.push(AdminUserDetailPage, {uid: uid});
          }
        },
        // {          
        //   text:'Inhabilitar cuenta',
        //   role: 'destructive',
        //   handler:()=>{
        //     if(confirm('¿Estas seguro de desactivar a este usuario?')){
        //       this._up.inhabilitar(uid);
        //       console.log('uid usuario', uid);
              
        //       console.log('Se inhabilito');
        //   } 
        // }
        // },
        {
          text:'Cancel',
          role:'cancel',
          handler:()=>{
            console.log("Cancelo");
            
          }
        }
      ]
    }).present();
  }

}
