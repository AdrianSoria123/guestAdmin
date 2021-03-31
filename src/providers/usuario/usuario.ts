import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Injectable()
export class UsuarioProvider {
data: any = {};


areas: AngularFirestoreCollection<any[]>;
_areas: Observable<any>;

usuario: Credenciales = {};

  constructor(
              public afDB: AngularFireDatabase,
              public afireauth: AngularFireAuth,
              public afs: AngularFirestore
            ) { }

  cargarUsuario(nombre:string,
                email:string,
                imagen:string,
                uid:string,
                phone: string,
                provider:string){
              this.usuario.nombre= nombre;
              this.usuario.email = email;
              this.usuario.imagen= imagen;
              this.usuario.uid = uid;
              this.usuario.provider = provider;
              this.usuario.phone = phone;
                }

                public getUser(uid){
                
                return this.afDB.object('users/'+uid);
                }

   inhabilitar(uid){
     console.log(uid);

    this.data ={
      active: false
    }
    this.afs.collection('users').doc(uid).update(this.data);
    // this.afDB.database.ref('users/'+ uid).update(this.data);
   }
   habilitar(uid, status){
    console.log(uid);

   this.data ={
     active: status
   }
   this.afs.collection('users').doc(uid).update(this.data);
  //  this.afDB.database.ref('users/'+ uid).update(this.data);
  }

  public getUser1(idx) {
    // return this.afiredatabase.object("sucursales/" + uid);
    console.log("user", idx);
    this.areas = this.afs.collection<any>("users", ref =>
      ref.where("uid", "==", idx)
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

}

export interface Credenciales {
  nombre?:string;
  email?:string;
  imagen?:string;
  uid?:string;
  phone?: string;
  provider?:string;
}
