import { Injectable } from '@angular/core';
import * as firebase from "firebase/app";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Stripe } from "@ionic-native/stripe";

@Injectable()
export class MonitoreoReservasProvider {
  db = firebase.firestore();
// Reservaciones
public  reservacionesCollection: AngularFirestoreCollection<any>;
public reservaciones: Observable<any[]>;
public  reservacionesCursoCollection: AngularFirestoreCollection<any>;
public reservacionesCurso: Observable<any[]>;
public  reservacionesAcepComCollection: AngularFirestoreCollection<any>;
public reservacionesAcepCom: Observable<any[]>;
public reservacionDoc: AngularFirestoreDocument<any>;
public reservacion: Observable<any>;
public areaDoc: AngularFirestoreDocument<any>;
public area: Observable<any>;
public zonaDoc: AngularFirestoreDocument<any>;
public zona: Observable<any>;
public eventoDoc: AngularFirestoreDocument<any>;
public evento: Observable<any>;
public tarjetaDoc: AngularFirestoreDocument<any>;
public tarjeta: Observable<any>;
public areas: AngularFirestoreCollection<any[]>;
public _areas: Observable<any>;
public reservaInfo2: AngularFirestoreCollection<any[]>;
public _reservaInfo2: Observable<any>;
public reservaInfo3: AngularFirestoreCollection<any[]>;
public _reservaInfo3: Observable<any>;

  constructor(
    public afs: AngularFirestore,
    public loadinCtl: LoadingController,
    public http: Http,
    public stripe: Stripe,
    ) {
    console.log('Hello MonitoreoReservasProvider Provider');
  }
  getReservaciones(idSucursal: string,fechaActual) {
    this.reservacionesCollection = this.afs.collection<any>("reservaciones", ref =>
      ref.where("idSucursal", "==", idSucursal)
          .where("estatus", '==', 'Aceptado')
          //.where("estatus", '==', 'AceptadoCompartida')
          .where("fechaR", '>=', fechaActual)
    );
    this.reservaciones = this.reservacionesCollection.valueChanges();
    return (this.reservaciones = this.reservacionesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getReservacionesAcepCom(idSucursal: string,fechaActual) {
    this.reservacionesAcepComCollection = this.afs.collection<any>("reservaciones", ref =>
      ref.where("idSucursal", "==", idSucursal)
          //.where("estatus", '==', 'Aceptado')
          .where("estatus", '==', 'AceptadoCompartida')
          .where("fechaR", '>=', fechaActual)
    );
    this.reservacionesAcepCom = this.reservacionesAcepComCollection.valueChanges();
    return (this.reservacionesAcepCom = this.reservacionesAcepComCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getReservacionesCurso(idSucursal: string,fechaActual) {
    this.reservacionesCursoCollection = this.afs.collection<any>("reservaciones", ref =>
      ref.where("idSucursal", "==", idSucursal)
         .where("estatus", '==', 'Pagando')
          .where("fechaR", '==', fechaActual)
    );
    this.reservacionesCurso = this.reservacionesCursoCollection.valueChanges();
    return (this.reservacionesCurso = this.reservacionesCursoCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getReservacionesDetalle(idReservacion) {
    this.reservacionesCollection = this.afs.collection<any>("reservaciones", ref =>
      ref.where("idReservacion", "==", idReservacion)
         .orderBy('fechaR_', "asc")
    );
    this.reservaciones = this.reservacionesCollection.valueChanges();
    return (this.reservaciones = this.reservacionesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  public getReserCom(idx) {
    // return this.afiredatabase.object("sucursales/" + uid);
    console.log("idReservacion", idx);
    this.reservaInfo2 = this.afs.collection<any>("compartidas", ref =>
      ref.where("idReservacion", "==", idx)
    );
    this._reservaInfo2 = this.reservaInfo2.valueChanges();
    return (this._reservaInfo2 = this.reservaInfo2.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  public getInfo(idx) {
    // return this.afiredatabase.object("sucursales/" + uid);
    console.log("idReservacion", idx);
    this.reservaInfo3 = this.afs.collection<any>("reservaciones", ref =>
      ref.where("idReservacion", "==", idx)
    );
    this._reservaInfo3 = this.reservaInfo3.valueChanges();
    return (this._reservaInfo3 = this.reservaInfo3.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getReservacionesPagando(idSucursal: string) {
    this.reservacionesCollection = this.afs.collection<any>("reservaciones", ref =>
      ref.where("idSucursal", "==", idSucursal)
         .where("estatus", '==', 'Pagando')
         .orderBy('fechaR_', "asc")
    );
    this.reservaciones = this.reservacionesCollection.valueChanges();
    return (this.reservaciones = this.reservacionesCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    ));
  }
  getAllClientes(collection: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .where("type", "==", "u")
        .get()
        .then(querySnapshot => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            console.log(obj);
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

 //Sacr el total de productos de una reservacion
  public getProductos(idx) {
    this.areas = this.afs.collection<any>("productos", ref =>
      ref.where("idReservacion", "==", idx)
    );
    this._areas = this.areas.valueChanges();
    return (this._areas = this.areas.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as any;
          data.$key = action.payload.doc.id;
          return data;
        });
      })
    ));
  }

  getMisreservaciones(idUsuario: string) {
    // this.afs.collection('reservaciones', ref => ref.where('idSucursal', '==', idSucursal)
    return new Promise((resolve, reject) => {
      this.db
        .collection('reservaciones')
        .orderBy('fechaR_', "asc")
        .get()
        .then(querySnapshot => {
          let arr = [];
          querySnapshot.forEach(function(doc) {
            var obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            console.log(obj);
            arr.push(obj);
          });

          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getReservacion(idReservacion) {
    console.log(idReservacion);
    this.reservacionDoc = this.afs.doc<any>(`reservaciones/${idReservacion}`);
      return this.reservacion = this.reservacionDoc.snapshotChanges().pipe(map(action => {
        if ( action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as any;
          data.idReservacion = action.payload.id;
          return data;
        }
      })
      );
}
getArea(idArea) {
  console.log(idArea);
  this.areaDoc = this.afs.doc<any>(`areas/${idArea}`);
    return this.area = this.areaDoc.snapshotChanges().pipe(map(action => {
      if ( action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as any;
        data.idReservacion = action.payload.id;
        return data;
      }
    })
    );
}
getZona(idZona) {
  console.log(idZona);
  this.zonaDoc = this.afs.doc<any>(`zonas/${idZona}`);
    return this.area = this.zonaDoc.snapshotChanges().pipe(map(action => {
      if ( action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as any;
        data.idReservacion = action.payload.id;
        return data;
      }
    })
    );
}
getAllMesas(idReserv): Promise<any> {
  return new Promise((resolve, reject) => {
    this.db
      .collection('reservaciones_mesas')
      .where("idReservacion", "==", idReserv)
      .get()
      .then(querySnapshot => {
        let arr = [];
        querySnapshot.forEach(function(doc) {
          var obj = JSON.parse(JSON.stringify(doc.data()));
          obj.$key = doc.id;
          console.log(obj);
          arr.push(obj);
        });

        if (arr.length > 0) {
          console.log("Document data:", arr);
          resolve(arr);
        } else {
          console.log("No such document!");
          resolve(null);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
getEvento(idEvento) {
  console.log(idEvento);
  this.eventoDoc = this.afs.doc<any>(`evento/${idEvento}`);
    return this.area = this.eventoDoc.snapshotChanges().pipe(map(action => {
      if ( action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as any;
        data.idReservacion = action.payload.id;
        return data;
      }
    })
    );
}
getAllProductos(idReserv): Promise<any> {
  return new Promise((resolve, reject) => {
    this.db
      .collection('productos')
      .where("idReservacion", "==", idReserv)
      .get()
      .then(querySnapshot => {
        let arr = [];
        querySnapshot.forEach(function(doc) {
          var obj = JSON.parse(JSON.stringify(doc.data()));
          obj.$key = doc.id;
          console.log(obj);
          arr.push(obj);
        });

        if (arr.length > 0) {
          console.log("Document data:", arr);
          resolve(arr);
        } else {
          console.log("No such document!");
          resolve(null);
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
getDatosTarjeta(idTarjeta) {
  console.log(idTarjeta);
  this.tarjetaDoc = this.afs.doc<any>(`tarjetas/${idTarjeta}`);
    return this.tarjeta = this.tarjetaDoc.snapshotChanges().pipe(map(action => {
      if ( action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as any;
        data.idTarjeta = action.payload.id;
        return data;
      }
    })
    );
}
cambiaPagando(uidRerservacion,numTarjeta,mesExpiracion,anioExpiracion,cvc,montoReservacion) {
    console.log('llegaron a pagar',uidRerservacion,numTarjeta,mesExpiracion,anioExpiracion,cvc,montoReservacion);
    // Poppup de carga para procesar el metodo
    let loading = this.loadinCtl.create({
    spinner: "bubbles",
    content: "Procesando pago."
    });//
    loading.present();
    /* Cambiando estatus a la reservación  */
    this.afs.collection('reservaciones').doc(uidRerservacion).update({
      estatus: 'Pagando'
    });
    alert('Estatus actualizado');
    //
    this.stripe.setPublishableKey('pk_test_TWx1xbw2HExTUYjy2Hz44koG00nFNYC3J4');
    //
    let card = {
      number: '4242424242424242',//numTarjeta
      expMonth: 12,//mesExpiracion
      expYear: 2020,//anioExpiracion
      cvc: '220'//cvc
     };
   this.stripe.createCardToken(card)
   .then(token => {
    let headers = new Headers({
      "Content-Type": "application/json"
    });
    let options = new RequestOptions({ headers: headers });
    let url = "https://proyectosinternos.com/guest_pagos/stripe_config.php";
    let data = JSON.stringify({
      cardToken: token.id,
      amount: '5000', //montoReservacion
      accion: 'stripe_prueba'
    });
    this.http.post(url, data, options).subscribe(res => {
      console.log('Este es el mensaje', JSON.stringify(res));
      if (res.json().status == "succeeded") {
        let title = "¡ Pago con exito !";
        alert('Pago con exito!');
        setTimeout(() => {
          loading.dismiss();
        }, 3000);
      }
  });
   })
   .catch(error => {
       alert('error!');
     alert(error);
     setTimeout(() => {
      loading.dismiss();
    }, 3000);
    } );
}
}
