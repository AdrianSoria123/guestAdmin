import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Injectable()
export class ResumenProvider {
  reservacion: AngularFirestoreDocument<any[]>;
  _reservacion: Observable<any>;

  sucursales: AngularFirestoreDocument<any[]>;
  _sucursales: Observable<any>;

  constructor(public af: AngularFirestore) {
    console.log("Hello ResumenProvider Provider");
  }

  gerReservacion(idx) {
    this.reservacion = this.af.doc<any>(`reservaciones/${idx}`);
    // this.pedidoDoc = this.afs.collection<Servicios>('servicios').doc(`/${idPedido}`).collection<Pedidos>('pedidos');
    return (this._reservacion = this.reservacion.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as any;
          data.uid = action.payload.id;
          return data;
        }
      })
    ));
  }

  getSucursal(idx) {
    this.sucursales = this.af.doc<any>(`sucursales/${idx}`);
    // this.pedidoDoc = this.afs.collection<Servicios>('servicios').doc(`/${idPedido}`).collection<Pedidos>('pedidos');
    return (this._sucursales = this.sucursales.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as any;
          data.uid = action.payload.id;
          return data;
        }
      })
    ));
  }
}
