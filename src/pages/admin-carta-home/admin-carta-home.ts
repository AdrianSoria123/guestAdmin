import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
//import { AdminCartaAddPage } from "../admin-carta-add/admin-carta-add";
//import { CartaItem } from '../../providers/carta-add/CartaItem';
import { AngularFireDatabase } from "angularfire2/database";
// import { Observable } from 'rxjs/Observable';
//import { CartaAddProvider } from '../../providers/carta-add/carta-add';
import { AdminCartaEditPage } from '../admin-carta-edit/admin-carta-edit';
import { ToastProvider } from '../../providers/toast/toast';
import { AdminCartaSubirPage } from '../admin-carta-subir/admin-evento-subir';
import { CargaArchivoCartaProvider } from '../../providers/carga-archivo-carta/carga-archivo';
import { ArchivoSubir } from "../../providers/carga-archivo-carta/ArchivoSubir";
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-admin-carta-home',
  templateUrl: 'admin-carta-home.html',
})
export class AdminCartaHomePage {
    cartas = [];
    sucursal: any;
    uid: string;
    sucursales: any;

    //hayMas:boolean= true;
    //cartaList$: Observable<CartaItem[]>;
    //cartaList: CartaItem[];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _cap: CargaArchivoCartaProvider,
              //private PrCa: CartaAddProvider,
              public DB: AngularFireDatabase,
              private actionSheet: ActionSheetController,
              private toastCtrl: ToastProvider,
              public authProvider: AuthProvider,
              public afs:  AngularFirestore,
              public firebase: AngularFireAuth,

              )
              {
                this.sucursal = this.firebase.auth.currentUser;
                if(this.sucursal != null ){
                 this.uid = this.sucursal.uid;
                 //Cuando es un usuario se saca el id de la sucursal ala que pertenece
                  this.afs.collection('users', ref => ref.where('uid', '==', this.sucursal.uid)).valueChanges().subscribe(data => {
                  this.sucursales = data;
                    this.sucursales.forEach(element => {
                      const uidSucursal = element.uidSucursal;
                      //  console.log('sucursal del user', uidSucursal );
                      // Listado de las cartas por sucursal
                      this.afs.collection('cartas', ref => ref.where('uidSucursal', '==', uidSucursal))
                      .valueChanges().subscribe( c => {
                        this.cartas = c;
                        console.log('cartas', c );
                      })
                   });
                   });
                   // Listado de las cartas por sucursal
                   this.afs.collection('cartas', ref => ref.where('uidSucursal', '==', this.uid))
                   .valueChanges().subscribe( c => {
                     this.cartas = c;
                     console.log('cartas', c );
                   })
                }

              // this.cartas = DB.list('bebidas').valueChanges();
              }

  //Go to the admin-carta-subir
  goCartaAdd(){
    this.navCtrl.push(AdminCartaSubirPage);
  }

  selectCartaItem(cartaItem: ArchivoSubir){
    /* Display an action that gives the user the following options
      1.Edit
      2. Delete
      3. Cancel
    */
    this.actionSheet.create({
      title: `${cartaItem.titulo}`,
      buttons:[
        {
          text: 'Editar',
          handler:()=>{
          this.navCtrl.push(AdminCartaEditPage,this._cap.selectedProduct= Object.assign({}, cartaItem));
          //this.navParams.get("cartaItem: cartaItem");
          //console.log(cartaItem);
          }
        },
        {
        text: 'Delete',
        role: 'destructive',
        handler: () =>{
          //Delete the currente CartaItem
        if(confirm('¿Estás seguro de eliminar este registro?')){
          this._cap.deleteCarta(cartaItem.key, cartaItem.img, cartaItem.uid);
          console.log('uidDele', cartaItem.uid);
          this.toastCtrl.show(`${cartaItem.titulo} deleted`);
        }
        }
        },
        {
        text:'Cancel',
        role:'cancel',
        handler:()=>{
          console.log("El usuario cancelo.");
        }
        }
      ]
    }).present();

  }

}
