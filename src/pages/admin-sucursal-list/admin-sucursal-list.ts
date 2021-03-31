import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AdminSucursalSubirPage } from '../admin-sucursal-subir/admin-sucursal-subir';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AdminSucursalPerfilPage } from '../admin-sucursal-perfil/admin-sucursal-perfil';
import { AdminHomePage } from '../admin-home/admin-home';
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-admin-sucursal-list',
  templateUrl: 'admin-sucursal-list.html',
})
export class AdminSucursalListPage {

  sucursales: any;
  usertipo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public Db: AngularFireDatabase,
    public afs: AngularFirestore
    ) {
      //recibe parametro de la reservacion
      this.usertipo = this.navParams.get("usertipo");
      console.log("llego a list");
      console.log(this.usertipo);
      this.afs.collection('sucursales').valueChanges().subscribe( s => {
        this.sucursales = s;
      })
      // this.sucursales = this.Db.list('sucursales').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalListPage');
  }
  mostrar_modal(){
    let modal = this.modalCtrl.create(AdminSucursalSubirPage);
    modal.present();
  }

  adminSucursal(uid){
    this.navCtrl.push(AdminSucursalPerfilPage, {'uid':uid, 'usertipo': this.usertipo});
  }
  goBack(){
    this.navCtrl.push(AdminHomePage);
  }

}
