import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import "firebase/database";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { TabsPage } from "../../pages/tabs/tabs";
import { Platform } from 'ionic-angular';
// import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AdminLoginPage } from "../../pages/admin-login/admin-login";
// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventosPage } from '../eventos/eventos';


@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  acti: any[];
  // firedata = firebase.database().ref('/users');
  us: any;

  pageLogin = "admin-login";
  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
              public usuarioProv: UsuarioProvider,
              // private fb: Facebook,
              private googlePlus: GooglePlus,
              private platform: Platform,
              // public afiredatabase: AngularFireDatabase,
              public afs: AngularFirestore
              ) {
              }            
              
              
   ionViewDidLoad() {
    //  if (localStorage.getItem("isLogin") == "true") {
    //      this.navCtrl.setRoot(TabsPage);
    //  }
  }
  signInWithFacebook_(){
    this.navCtrl.setRoot(EventosPage);
  }

  signInGoogle() {
    this.googlePlus
      .login({
        webClientId:
          "853477386824-kt4bl5ccfs8hgfm255i3384fhb6e50jq.apps.googleusercontent.com",
        offline: true
      })
      .then(res => {
        firebase
          .auth()
          .signInWithCredential(
            firebase.auth.GoogleAuthProvider.credential(res.idToken)
          )
          .then(user => {
            this.us = user.user;
            console.log(JSON.stringify(user));
            console.log(res.idToken);
            this.usuarioProv.cargarUsuario(
              this.us.displayName,
              this.us.email,
              this.us.photoURL,
              this.us.uid,
              this.us.phoneNumber,
              "google"
            );
            this.afs
              .collection("users")
              .doc(this.usuarioProv.usuario.uid)
              .set({
                uid: this.usuarioProv.usuario.uid,
                displayName: this.us.displayName,
                email: this.us.email,
                photoURL: this.us.photoURL,
                provider: "google",
                phoneNumber: this.us.phoneNumber,
                type: "u"
              });
            this.navCtrl.setRoot(TabsPage);
          })
          .catch(error =>
            console.log("Firebase failure: " + JSON.stringify(error))
          );
      })
      .catch(err => console.error("Error: ", err));
  }

  // signInWithFacebook() {
  //   if (this.platform.is('cordova')) {
  //     this.fb.login(['email', 'public_profile']).then(res => {
  //      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
  //      firebase.auth().signInWithCredential(facebookCredential)
  //      .then(user => {
  //       this.us = user.user;
  //       localStorage.setItem("uid", this.us.uid);
  //       alert(JSON.stringify(this.us.uid));
  //        console.log(res);
  //        this.usuarioProv.cargarUsuario(
  //          this.us.displayName,
  //          this.us.email,
  //          this.us.photoURL,
  //          this.us.uid,
  //          this.us.phoneNumber,
  //          'facebook'         
  //        );
  //        this.afs.collection('users').doc(this.usuarioProv.usuario.uid).set({
  //          uid: this.usuarioProv.usuario.uid,
  //          displayName: this.us.displayName,
  //          email: this.us.email,
  //          photoURL: this.us.photoURL,
  //          phoneNumber: this.us.phoneNumber,
  //          provider: 'facebook',
  //          type: 'u'

  //        });
  //        this.navCtrl.setRoot(TabsPage);

  //       }).catch(e => alert('Error de autenticación' + JSON.stringify(e)));
  //     })
  //   }else{
  //     //Escritorio
      
  //     this.afAuth.auth
  //     .signInWithPopup(new firebase.auth.FacebookAuthProvider())
  //     .then(res => {

  //       console.log(res);
  //       let user = res.user;
  //       console.log('Datos User: ', user);
  //       localStorage.setItem('uid', user.uid);
        
  //       this.usuarioProv.cargarUsuario(
  //         user.displayName,
  //         user.email,
  //         user.photoURL,
  //         user.uid,
  //         user.phoneNumber,
  //         'facebook'
  //       );
  //       if( this.usuarioProv.usuario.uid ){
  //         this.afs.collection('users').doc(this.usuarioProv.usuario.uid).set({
  //           uid: this.usuarioProv.usuario.uid,
  //           displayName: user.displayName,
  //           email: user.email,
  //           photoURL: user.photoURL,
  //           phoneNumber: user.phoneNumber,
  //           provider: 'facebook',
  //           type: 'u'
  //         });
  //       }else {
  //         this.afs.collection('users').add({
  //           uid: this.usuarioProv.usuario.uid,
  //           displayName: user.displayName,
  //           email: user.email,
  //           photoURL: user.photoURL,
  //           phoneNumber: user.phoneNumber,
  //           provider: 'facebook',
  //           type: 'u'
  //         });
  //       }
  //       this.navCtrl.setRoot(TabsPage);
  //     });
  //   }
  // }

  signIn(){
    this.navCtrl.setRoot(TabsPage);
  }
  goLogin() {
    this.navCtrl.push(AdminLoginPage);
  }
}