import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { CargaArchivoCartaProvider } from '../../providers/carga-archivo-carta/carga-archivo';
import { AdminCartaHomePage } from '../admin-carta-home/admin-carta-home';


@IonicPage()
@Component({
  selector: 'page-admin-carta-image-edit',
  templateUrl: 'admin-carta-image-edit.html',
})
export class AdminCartaImageEditPage {
  imagenPreview: string = "";
  imagen64: string = "";
  carta = { key: null } 
  cartaKey: null;
  cartaUid: null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker: ImagePicker, public caPr: CargaArchivoCartaProvider ) {
    this.carta.key = navParams.get('key');   
    this.cartaUid = navParams.get('uid');   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCartaImageEditPage');
    console.log('KEY:',this.carta.key);

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
  editarImagen(key){
    let data={
      img: this.imagen64,
      key: key
    }
    this.caPr.cargar_imagen_firebase_carta(data, this.cartaUid)
      .then(()=>this.navCtrl.pop);
  }

}
