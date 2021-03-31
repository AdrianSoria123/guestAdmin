import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
// import { AdminEventoSubirPage } from '../admin-evento-subir/admin-evento-subir';



@IonicPage()
@Component({
  selector: 'page-admin-evento-image-edit',
  templateUrl: 'admin-evento-image-edit.html',
})
export class AdminEventoImageEditPage {
imagenPreview: string = "";
imagen64: string = "";
evento = { key: null } 
eventoUid: any;
eventoKey: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, private sucProv: CargaArchivoProvider) {
    this.eventoKey = navParams.get('key');
    console.log('key', this.evento.key);    
    this.eventoUid = navParams.get('uid');
    console.log('uid',this.eventoUid);  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminEventoImageEditPage');
  }
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
  editarImagen(){
    let data={
      img: this.imagen64
    }
    this.sucProv.cargar_imagen_firebase_evento(data, this.eventoKey, this.eventoUid )
      .then(()=>this.navCtrl.pop);
      console.log('data', data);
      
  }

}
