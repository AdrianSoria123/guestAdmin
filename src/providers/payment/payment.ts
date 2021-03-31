import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe } from "@ionic-native/stripe";
import { LoadingController, AlertController } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Http, Headers, RequestOptions } from "@angular/http";


@Injectable()
export class PaymentProvider {

  constructor(
              public stripe: Stripe,
              public loadinCtl: LoadingController,
              public alertCtrl: AlertController,
              public afs: AngularFirestore,
              public http: Http
              ) {
    console.log('Hello PaymentProvider Provider');
  }

  payment(uidRerservacion) {
    // Poppup de carga para procesar el metodo
    let loading = this.loadinCtl.create({
      spinner: "bubbles",
      content: "Cambiando estatus de reservación."
    });
    loading.present();
    /* Cambiando estatus a la reservación  */
    this.afs.collection('reservaciones').doc(uidRerservacion).update({
      estatus: 'Pagando'
    });
    alert('Estatus actualizado');
    //
    this.stripe.setPublishableKey('pk_test_3PsctNfFB5NuLWNc89rvH9gC00a0GVfm9K');  
    // 
    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     };
   this.stripe.createCardToken(card)
   .then(token => {
    let headers = new Headers({
      "Content-Type": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://guest-7dfab.firebaseapp.com/pago";
    let data = JSON.stringify({
      cardToken: token.id,
      amount: '500',
      clave: 'clave'
    });
    this.http.post(url, data, options).subscribe(res => {
      if (res.json().status == "succeeded") {
        let title = "¡ Pago con exito !";

        setTimeout(() => {
          loading.dismiss();
        }, 3000);
      }
  });
   })
   .catch(error => console.error(error));
  }

}
