import { Component } from '@angular/core';
import { ViewController, Platform } from 'ionic-angular';
//import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo"
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProvider } from '../../providers/user/user';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'page-admin-evento-subir',
  templateUrl: 'admin-evento-subir.html',
})
export class AdminEventoSubirPage {

  titulo:string = "";
  fecha: string = "";
  hora: string = "";
  hora_fin: string = "";
  categoria: string = "";
  lugar: string = "";
  obs: string = "";
  imagenPreview: string = "";
  imagen64: string = "";
  uid: any;
  sucursal: any;
  users: any;
  sucursales: any;
  sucursales2: any;
  ciudadSucursal: any;


  constructor( private viewCtrl: ViewController,
                //private camera: Camera,
                private imagePicker: ImagePicker,
                public _cap: CargaArchivoProvider,
                public firebase: AngularFireAuth,
                public afs: AngularFirestore,
                public platform: Platform,
                public _provderUser: UserProvider
                ) {
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
                //Cuando es un usuario se saca el id de la sucursal ala que pertenece
                 this.afs.collection('sucursales', ref => ref.where('uid', '==', this.uid)).valueChanges().subscribe(data2 => {
                 this.sucursales2 = data2;
                   this.sucursales2.forEach(element2 => {
                    this.ciudadSucursal= element2.ciudad;
                    console.log('ciudad sucursal', this.ciudadSucursal);
                  });
                  });
             }
          });
          });
      }
      //obtener la ciudad de la sucursal para insertarla en el Evento
       this.afs.collection('sucursales', ref => ref.where('uid', '==', this.uid)).valueChanges().subscribe(data2 => {
       this.sucursales2 = data2;
         this.sucursales2.forEach(element2 => {
          this.ciudadSucursal= element2.ciudad;
          console.log('ciudad sucursal', this.ciudadSucursal);
        });
        });

  }

  ionViewDidLoad(){
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
  crear_post(ciudad){
    let archivo ={
      img: this.imagen64,
      titulo: this.titulo,
      fecha: this.fecha,
      hora: this.hora,
      hora_fin: this.hora_fin,
      categoria: this.categoria,
      lugar: this.lugar,
      obs: this.obs,
      uidSucursal: this.uid,
      ciudad: ciudad
    }
    this._cap.cargar_imagen_firebase(archivo)
    .then(()=>{
      this.cerrar_modal();
      this.getUsersPusNoti();
    });
  }

  getUsersPusNoti(){
    this._provderUser.getAllUsers().subscribe(users => {
      this.users = users;
      console.log('Estos son los usuarios: ', this.users);
      this.users.forEach(user => {
        console.log("PlayerID: ", user.playerID);
        if (this.platform.is("cordova")) {
          let noti = {
            app_id: "de05ee4f-03c8-4ff4-8ca9-c80c97c5c0d9",
            include_player_ids: [user.playerID],
            data: { foo: "bar" },
            contents: {
              en: " Nuevo Evento "
            }
          };

          window["plugins"].OneSignal.postNotification(
            noti,
            function(successResponse) {
              console.log(
                "Notification Post Success:",
                successResponse
              );
            },
            function(failedResponse: any) {
              console.log("Notification Post Failed: ", failedResponse);
            }
          );
        } else {
          console.log("Solo funciona en dispositivos");
        }
      });
    });
  }


}
