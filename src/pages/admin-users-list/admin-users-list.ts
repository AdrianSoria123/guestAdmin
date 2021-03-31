import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdminUsersGuestPage } from '../admin-users-guest/admin-users-guest';
import { AdminUserUserPage } from '../admin-user-user/admin-user-user';

@IonicPage()
@Component({
  selector: 'page-admin-users-list',
  templateUrl: 'admin-users-list.html',
})
export class AdminUsersListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminUsersListPage');
  }
  
  goEmpleados(){
    this.navCtrl.push(AdminUsersGuestPage);
  }
  goUsers(){
    this.navCtrl.push(AdminUserUserPage);
  }

}
