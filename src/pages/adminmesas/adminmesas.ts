import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SucursalAltaProvider } from '../../providers/sucursal-alta/sucursal-alta';

@IonicPage()
@Component({
  selector: 'page-adminmesas',
  templateUrl: 'adminmesas.html',
})
export class AdminmesasPage {
  idArea: any;
  idZona: any;
  area: any= {} ;
  zona: any= {};
  mesas: any[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,              
              public SucProv: SucursalAltaProvider) {                
    this.idArea = this.navParams.get('idArea');
    this.idZona = this.navParams.get('idZona');
                  
  }

  ionViewDidLoad() {
    this.consultaArea();
    this.consultaZona();
    this.getMesas();

  }

  consultaArea(){
    this.SucProv.getArea(this.idArea).subscribe( s => {
      this.area = s;
      console.log('Area', s);
    })
  }

  consultaZona(){
    this.SucProv.getZona(this.idZona).subscribe(z =>{
      this.zona = z;
      console.log('Zona',z);      
    })
  }

  getMesas() {
    this.SucProv.getMesas(this.idZona).subscribe(mesas => {
      this.mesas = mesas;      
      let longitud = this.mesas.length;
      console.log("Esta es la longitud: ",longitud);
      
      console.log("mesas JAJA: ", this.mesas);         
    });
  }

  modificaMesa(idMesa, numMesa, numPersonas){
    let alert = this.alertCtrl.create({
      title: 'Modificar Mesa',
      inputs: [
        {
          name: 'numMesa',
          value: numMesa,
          type: 'number'
        },
        {
          name: 'numPersonas',
          value: numPersonas,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Eliminar',
          handler: data => {
            console.log('Cancel clicked');
            this.eliminarMesa(idMesa);
            // this.navCtrl.setPages([{page:'AdminSucursalPerfilPage'}]);
          }
        },
        {
          text: 'Actualizar',
          handler: data => {            
            console.log('Actualizar clicked');
            this.modificarMesa(data.numMesa, data.numPersonas, idMesa);
          }
        }
      ]
    });
    alert.present();

}

modificarMesa(numMesa, numPersonas, idMesa){
  if (numMesa == '') {

    this.alertCtrl.create({
      title: 'El número de mesa es obligatorio',            
      buttons: ['Aceptar']
    }).present();

  } else if(numPersonas == ''){
    this.SucProv.alertCtrl.create({
      title:'El número de personas por mesa es obligatorio',
      buttons:['Aceptar']
    }).present();
  } else {
      this.SucProv.modificarMesa(numMesa, numPersonas, idMesa);
  }
}

eliminarMesa(idMesa){
  let alert = this.alertCtrl.create({
    title: 'Eliminar Mesa',
    subTitle: 'Esta seguro que desea eliminar la mesa',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: data => {

          this.SucProv.eliminarMesa(idMesa);

        }
      }
    ]
  });
  alert.present();
}
}
