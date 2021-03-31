import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoCartaProvider } from '../../providers/carga-archivo-carta/carga-archivo';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'page-admin-evento-subir',
  templateUrl: 'admin-evento-subir.html',
})
export class AdminCartaSubirPage {

  titulo:string = "";
  categoria: string = "";
  precio: string = "";
  nota: string = "";
  imagenPreview: string = "";
  imagen64: string = "";
  uid: any;
  sucursal: any;
  sucursales:any;

  constructor( private viewCtrl: ViewController,
                //private camera: Camera,
                private imagePicker: ImagePicker,
                public _cap: CargaArchivoCartaProvider,
                public firebase: AngularFireAuth,
                public navParams: NavParams,
                public afs: AngularFirestore,

                )
  {
      // ricibiendo parametro del uid de la sucursal
      this.sucursal = this.firebase.auth.currentUser;
                if(this.sucursal != null ){
                  this.uid = this.sucursal.uid;
                  //Cuando es un usuario se saca el id de la sucursal ala que pertenece
                   this.afs.collection('users', ref => ref.where('uid', '==', this.sucursal.uid)).valueChanges().subscribe(data => {
                   this.sucursales = data;
                     this.sucursales.forEach(element => {
                       const tipoUser = element.type;
                       const uidSucursal = element.uidSucursal;
                       if(tipoUser == 'coordinacion'  || tipoUser == 'rp' || tipoUser == 'capitan_mesero'){
                          this.uid = uidSucursal;
                       }
                    });
                    });
                }

  }
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

//   mostrar_camara(){
//     const options: CameraOptions = {
//   quality: 100,
//   destinationType: this.camera.DestinationType.FILE_URI,
//   encodingType: this.camera.EncodingType.JPEG,
//   mediaType: this.camera.MediaType.PICTURE
// }
//
// this.camera.getPicture(options).then((imageData) => {
//  // imageData is either a base64 encoded string or a file URI
//  // If it's base64 (DATA_URL):
//  this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
//  this.imagen64 = imageData;
// }, (err) => {
//  // Handle error
//  console.log( "Error en la camara", JSON.stringify(err));
// });
//   }

  seleccionar_foto(){
    let opciones:ImagePickerOptions={
      quality: 70,
      outputType: 1,
      maximumImagesCount: 1
    }
    this.imagePicker.getPictures(opciones).then((results) => {
        for (var i = 0; i < results.length; i++) {
          //console.log('Image URI: ' + results[i]);
          this.imagenPreview = 'data:image/jpeg;base64,' + results[i];
          this.imagen64 = results[i];


  }
  }, (err) => {
    console.log("Error en selector", JSON.stringify(err))
  });
  }
  crear_post(){
    let archivo ={
      img: this.imagen64,
      titulo: this.titulo,
      categoria: this.categoria,
      precio: this.precio,
      nota: this.nota,
      uidSucursal: this.uid
    }
    this._cap.cargar_imagen_firebase(archivo)
    .then(()=>this.cerrar_modal());
  }


}
