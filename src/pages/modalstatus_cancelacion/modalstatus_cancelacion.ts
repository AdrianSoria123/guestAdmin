import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReservacionProvider } from "../../providers/reservacion/reservacion";

@IonicPage()
@Component({
  selector: 'page-modalstatus_cancelacion',
  templateUrl: 'modalstatus_cancelacion.html',
})
export class Modalstatus_cancelacionPage {
  idReserv: any;
  idSucursal: any;
  myForm: FormGroup;
  data: any = {};
  mesas: any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public fb: FormBuilder,
              public _providerReserva: ReservacionProvider,
              public navParams: NavParams) {
    this.idReserv = this.navParams.get("idReserv");
    console.log("Id Reserv: ", this.idReserv);
    
    this.idSucursal = this.navParams.get("idSucursal");
    console.log("Id Sucursal: ", this.idSucursal);


    this.myForm = this.fb.group({     
      motivo: ["", [Validators.required]],
      status: ["", [Validators.required]]
    });

     console.log("Motivo seleccionada: ", this.data.motivo);
     console.log("Estatus seleccionada: ", this.data.status);

  }

  ionViewDidLoad() {
    // this.getMesas(this.idSucursal);
  }

  saveData(){
    console.log(this.myForm.value);
    console.log('saveDataMotivo: ',this.data.motivo);
    console.log('saveDataStatus: ',this.data.status);
    let info = {
      motivo: this.data.motivo,
      status: this.data.status,
      otro: "xxx",
    };
    this._providerReserva.cancelarStatus(this.idReserv, info).then((respuesta: any) => {
        console.log("Respuesta: ", respuesta);
      });
      this.closeModal();
  }

  // getMesas(idx) {
  //   this._providerReserva.getMesas2(idx).subscribe(mesas => {
  //     console.log("Mesas2", mesas);
  //     this.mesas = mesas;
  //   });
  // }

  closeModal() {
    this.navCtrl.pop();
}

}
