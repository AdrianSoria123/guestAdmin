import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';


@IonicPage()
@Component({
  selector: 'page-admin-sucursal-editperfil-imagen',
  templateUrl: 'admin-sucursal-editperfil-imagen.html',
})
export class AdminSucursalEditperfilImagenPage {

  imagenPreview: string = "";
  imagen64: string = "";
  sucursal = { uid: null }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    public sucProv: SucursalAltaProvider
 
    ) {
    this.sucursal.uid = navParams.get('uid');
    console.log(this.sucursal.uid);    
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
  editarImagen(uid){
    let archivo={
      photoURL: this.imagen64,
      uid:uid,
    }
    this.sucProv.cargar_imagen_firebase(archivo)
      .then(()=>this.navCtrl.pop());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminSucursalEditperfilImagenPage');    
  }

}
