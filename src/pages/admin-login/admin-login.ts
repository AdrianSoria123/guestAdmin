import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AdminHomePage } from "../../pages/admin-home/admin-home";

@IonicPage()
@Component({
  selector: 'page-admin-login',
  templateUrl: 'admin-login.html',
})
export class AdminLoginPage {
  credentials: any = {
        email: '',
        password: ''
    }

  constructor(public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public authProvider: AuthProvider) {
  }
  ionViewDidLoad() {
        if (localStorage.getItem("isLogin") == "true") {
            this.navCtrl.setRoot(AdminHomePage);
        }
    }
    login() {
          this.authProvider.login(this.credentials).then((res: any) => {
              this.navCtrl.setRoot(AdminHomePage);
              console.log(this.credentials.email);
              console.log('Res', res);
          }).catch((err) => {

              alert(err.message);
          });

      }

      // register() {
      //     this.navCtrl.push("RegisterPage")
      // }

}
