import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { CartaAddProvider } from '../../providers/carta-add/carta-add';
// import { CartaItem } from "../../providers/carta-add/CartaItem";
import { ToastProvider } from '../../providers/toast/toast';
import { AngularFireDatabase } from '@angular/fire/database';
//import { NgForm } from '@angular/forms';
import { CargaArchivoCartaProvider } from '../../providers/carga-archivo-carta/carga-archivo';
import { ArchivoSubir } from '../../providers/carga-archivo-carta/ArchivoSubir';
import { AdminCartaImageEditPage } from '../admin-carta-image-edit/admin-carta-image-edit';



@IonicPage()
@Component({
  selector: 'page-admin-carta-edit',
  templateUrl: 'admin-carta-edit.html',
})
export class AdminCartaEditPage {
  cartaItem: ArchivoSubir={
    titulo: this.crPr.selectedProduct.titulo,
    precio: this.crPr.selectedProduct.precio,
    categoria: this.crPr.selectedProduct.categoria,
    nota: this.crPr.selectedProduct.nota,
    img: this.crPr.selectedProduct.img
  };
// $key: string;

data:any = {};

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private crPr: CargaArchivoCartaProvider,
              //  private toastCtrl: ToastProvider,
              //  private DB: AngularFireDatabase 
               ) {

                this.crPr.selectedProduct.key;
                this.crPr.selectedProduct.titulo;
                this.crPr.selectedProduct.categoria;
                this.crPr.selectedProduct.precio;

                console.log(this.crPr.selectedProduct.titulo);

               }

  ionViewDidLoad(){
    this.cartaItem = this.navParams.get('cartaItem');
  }
  SaveCartaItem(cartaItem : ArchivoSubir){

    console.log(cartaItem);

    this.data = {

      titulo: this.crPr.selectedProduct.titulo,
      precio: this.crPr.selectedProduct.precio,
      categoria: this.crPr.selectedProduct.categoria,
      nota: this.crPr.selectedProduct.nota,
      KEY: this.crPr.selectedProduct.key

    }
    const cartaUId = this.crPr.selectedProduct.uid;    
    console.log(this.data);
    this.crPr.updateCarta(this.data, cartaUId)
    // .then(ref =>{
    //   this.toastCtrl.show(`${this.data.name} Edited!`)
    //  //this.navCtrl.setRoot('AdminCartaHomePage', {$key: ref.$key});
     this.navCtrl.pop();
     //})

    //console.log(this.crPr.selectedProduct.$key);


    //console.log(this.crPr.selectedProduct.$key);

  }
  editCartaImg(key, uid) {
    this.navCtrl.push(AdminCartaImageEditPage, {key:key, uid:uid});
  }
}
