import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
@IonicPage()
@Component({
  selector: 'page-admin-de-mon-user',
  templateUrl: 'admin-de-mon-user.html',
})
export class AdminDeMonUserPage {
  idUser: any;
  user: any = {};
  terminados = [];
  cancelados = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    ) {
    this.idUser = this.navParams.get('idUser');
    console.log('idUser', this.idUser);
    this.afs.collection('users').doc(this.idUser).valueChanges().subscribe( user => {
      this.user = user;
      console.log('user doc', this.user);
    });
    this.getTerminados(this.idUser);
    this.getCancelados(this.idUser);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminDeMonUserPage');
  }

  getTerminados(id) {
    this.afs.collection('reservaciones', ref => ref
    .where('idUsuario', '==', id)
    .where('estatus', '==', 'Terminados'))
    .valueChanges().subscribe( ter => {
      this.terminados = ter;
      console.log('terminados', ter);
    })
  }

  getCancelados(id) {
    this.afs.collection('reservaciones', ref => ref
    .where('idUsuario', '==', id)
    .where('estatus', '==', 'Cancelados'))
    .valueChanges().subscribe( ter => {
      this.cancelados = ter;
      console.log('cancelados', ter);
    })
  }
}
