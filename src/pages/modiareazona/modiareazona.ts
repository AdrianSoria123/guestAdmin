import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReservacionProvider } from "../../providers/reservacion/reservacion";

@IonicPage()
@Component({
  selector: 'page-modiareazona',
  templateUrl: 'modiareazona.html',
})
export class ModiareazonaPage {
  idReserv: any;
  idSucursal: any;
  idArea: any;
  idZona: any;
  myForm: FormGroup;
  data: any = {};
  areas: any;
  zonas: any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public fb: FormBuilder,
              public _providerReserva: ReservacionProvider,
              public navParams: NavParams) {
    this.idReserv = this.navParams.get("idReserv");
    console.log("Id Reserv: ", this.idReserv);
    
    this.idSucursal = this.navParams.get("idSucursal");
    console.log("Id Sucursal: ", this.idSucursal);

    this.idArea = this.navParams.get("idArea");
    console.log("Area: ", this.idArea);

    this.idZona = this.navParams.get("idZona");
    console.log("Zona: ", this.idZona);

    this.myForm = this.fb.group({     
      area: [" ", [Validators.required]],
      zona: ["", [Validators.required]]
    });

    console.log("Area seleccionada: ", this.data.area);

  }

  ionViewDidLoad() {
    this.getAreas(this.idSucursal);
  }

  getAreas(idx) {
    this._providerReserva.getAreas(idx).subscribe(areas => {
      console.log("areas", areas);
      this.areas = areas;
    });
  }

  getZonas() {
    const idx = this.idSucursal;
    const area = this.data.area;
    this._providerReserva.getZonas(idx, area).subscribe(zonas => {
      console.log("zona", zonas);
      this.zonas = zonas;
    });
  }

  alertConsumo() {
    const zona = this.data.zona;
  
      let alertMesas = this.alertCtrl.create({
        message:
          "<div text-center> Esta zona cuenta con un consumo sugerido de " +
          "<br><br>" +
          "<b>" +
          150 +
          "</b>" +
          "</div>",
        buttons: [
          {
            text: "Aceptar",
            handler: () => {
              console.log("Buy clicked");
            }
          }
        ]
      });
      alertMesas.present();
  }

}
