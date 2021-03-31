import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CiudadEstablecimientoPage } from '../ciudad-establecimiento/ciudad-establecimiento';
import { SucursalAltaProvider } from "../../providers/sucursal-alta/sucursal-alta";
import { AngularFirestore } from '@angular/fire/firestore';

@IonicPage()
@Component({
  selector: 'page-agregar-ciudad',
  templateUrl: 'agregar-ciudad.html',
})
export class AgregarCiudadPage {

    myForm: FormGroup;
    ciudad: any;
    resultadoCiudad: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public fb: FormBuilder,
              public sucursalProv: SucursalAltaProvider,
              public afs: AngularFirestore) {
        //validar que los inputs del formulario no esten vacios
        this.myForm = this.fb.group({
          ciudad: ["", [Validators.required]]
        });
  }

  //funcion para registrar nuevos cupones
  ciudadAdd(){
   console.log('lego ciudad',this.ciudad);
    this.afs.collection('ciudades', ref => ref.where('ciudad', '==', this.ciudad)).valueChanges().subscribe(data => {
      this.resultadoCiudad = data;
      ///console.log("total ciudades", this.resultadoCiudad.length);
       if(this.resultadoCiudad.length == 0){
         this.sucursalProv.agregarCiudad(this.ciudad);
         //this.navCtrl.setRoot(CiudadEstablecimientoPage);
         this.navCtrl.push(CiudadEstablecimientoPage);
       }

     });


  }

}
