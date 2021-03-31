import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the AdminUserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-user-detail',
  templateUrl: 'admin-user-detail.html',
})
export class AdminUserDetailPage {
  //user: any={uid: null, nombre: null, email: null, imagen: null,  provider: null, active: null, phoneNumber: null}
  user: any={}
  constructor(public navCtrl: NavController, public navParams: NavParams, public _cap: UsuarioProvider )  {
      //  this.user.uid = navParams.get('uid');
      //  _cap.getUser(this.user.uid)
      //   .valueChanges().subscribe(user=>{
      //     this.user = user;
      //   });

        this.getUser(navParams.get('uid'));
  }

  getUser(idx) {
    var array={};
    this._cap.getUser1(idx).subscribe(users => {
      this.user=users;
      console.log('users',users);
      users.forEach(function (value) {
        console.log(value.active);
        array= {uid: value.uid, displayName: value.displayName, email: value.email, photoURL: value.photoURL ,  provider: value.provider, active: value.active, phoneNumber: value.phoneNumber};     
    });
       this.user = array;      
       console.log(this.user);
    });
  }


 
  habilitar_user(uid, status){
    console.log(status);
      if(status == true){
        if(confirm('¿Estas seguro de habilitar este usuario?')){
          this._cap.habilitar(uid, status);
          console.log('Se habilito');
        }
      }else{
        if(confirm('¿Estas seguro de deshabilitar este usuario?')){
          this._cap.habilitar(uid, status);
          console.log('Se deshabilito');
      }
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUserDetailPage');
  }

}
