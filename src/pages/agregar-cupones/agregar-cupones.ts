import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
import { SucursalAltaProvider } from "../../providers/sucursal-alta/sucursal-alta";
import { CuponesSucursalPage } from '../cupones-sucursal/cupones-sucursal';

@IonicPage()
@Component({
  selector: 'page-agregar-cupones',
  templateUrl: 'agregar-cupones.html',
})
export class AgregarCuponesPage {
    //declaracion de variables
    sucursales: any;
    myForm: FormGroup;
    sucursal: any;
    valorCupon: any;
    numCupones: any;
    condicion: any;
    fechaActual: any;
    fechaExp: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public afs: AngularFirestore,
              public sucursalProv: SucursalAltaProvider) {

      //validar que los inputs del formulario no esten vacios
      this.myForm = this.fb.group({
        sucursal: ["", [Validators.required]],
        valorCupon: ["", [Validators.required]],
        numCupones: ["", [Validators.required]],
        condicion: ["", [Validators.required]],
        fechaExp: ["", [Validators.required]]
      });
  }

  ionViewDidLoad() {
    //cargar fecha actual
    this.fechaActual = new Date().toJSON().split("T")[0];
    console.log('ionViewDidLoad AgregarCuponesPage',this.fechaActual);
    //ejecutar funcion para cargar info de las Sucursales en cuanto se cargue pagina
    this.cargarSucursales();
  }

  //funcion cargar info de las sucursales
  cargarSucursales(){
    this.afs.collection('sucursales').valueChanges().subscribe( s => {
      this.sucursales = s;
    });
  }

  //funcion para registrar nuevos cupones
  cuponAdd(){
    let a = '100000';
    const codigoCupon = Math.round(Math.random() * (999999 - 100000) + parseInt(a));
    //console.log("codigo",num);
    this.sucursalProv.agregarCupon(codigoCupon,this.sucursal,this.valorCupon,this.numCupones,this.condicion,this.fechaExp,this.fechaActual);
    //this.navCtrl.setRoot(CuponesSucursalPage);
    this.navCtrl.push(CuponesSucursalPage);
  }

}
