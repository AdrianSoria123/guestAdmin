import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { SucursalAltaProvider, Credenciales } from '../../providers/sucursal-alta/sucursal-alta';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { AdminSucursalEditperfilPage } from '../admin-sucursal-editperfil/admin-sucursal-editperfil';
import { AdminSucursalEditperfilImagenPage } from '../admin-sucursal-editperfil-imagen/admin-sucursal-editperfil-imagen';
import { AdminSucursalCroquisPage } from '../admin-sucursal-croquis/admin-sucursal-croquis';
import { ImagencroquisPage } from '../imagencroquis/imagencroquis';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { CorteVentaPage} from '../corte-venta/corte-venta';
import { CorteHistorialPage } from '../corte-historial/corte-historial';
import { AdminSucursalListPage } from '../admin-sucursal-list/admin-sucursal-list';
// import { AdminmesasPage } from '../adminmesas/adminmesas';





@IonicPage()
@Component({
  selector: 'page-admin-sucursal-perfil',
  templateUrl: 'admin-sucursal-perfil.html',
})
export class AdminSucursalPerfilPage {

  sucursales: any;
  sucursal: any;
  uid: null;
  areas: any[];
  zonas: any[];
  zonaNombre: any;
  zonaArea: any;
  zona:any = {};
  area: any = {};
  sucursal_croquis: any;
  usertipo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public SucProv: SucursalAltaProvider,
    public authProvider: AuthProvider,
    public afDB: AngularFireDatabase,
    public alertCtrl: AlertController,
    public loadinCtl: LoadingController,
    public toastCtrl: ToastController

    ) {

    this.sucursal = this.navParams.get('uid');
    console.log('uid sucursal', this.sucursal );
    this.usertipo = this.navParams.get('usertipo');
    console.log('user tipo en perfil', this.usertipo );
    SucProv.getSucursal(this.sucursal).subscribe( s => {
      this.sucursales = s;
      console.log('sucursal', s);
    })
    SucProv.getImagenSucursal(this.sucursal).subscribe( sucur => {
      this.sucursal_croquis = sucur;
      console.log('sucursal croquis', this.sucursal_croquis);
    })

      // this.areas = afDB.list('areas/'+this.sucursal+'/').snapshotChanges().map(data => {
      //   return data.map(s => ({ key: s.payload.key, ...s.payload.val() }));

      // });
      // this.zonas = afDB.list('zonas/').snapshotChanges().map(data => {
      //   return data.map(s => ({ key: s.payload.key, ...s.payload.val() }));
      // });
  }

  ionViewDidLoad() {
    console.log(this.sucursal);
   // console.log(this.sucursalItem);
    // console.log('ionViewDidLoad AdminSucursalPerfilPage');
    this.getAreas();
    this.getZonas();
  }

  logout() {
  	this.authProvider.logout();
  	this.navCtrl.setRoot(LoginPage);
  }
  goEditPerfil(sucursalItem: Credenciales){
    this.navCtrl.push(AdminSucursalEditperfilPage, this.SucProv.selectedSucursalItem = Object.assign({}, sucursalItem))
    console.log('sucursal item',sucursalItem);
  }
  goCorteVentas(sucursalItem: Credenciales){
    this.navCtrl.push(CorteVentaPage, this.SucProv.selectedSucursalItem = Object.assign({}, sucursalItem))
    //console.log('sucursal item',sucursalItem);
  }
  goCorteHistorial(sucursalItem: Credenciales){
    console.log('Historial-Corte');
    this.navCtrl.push(CorteHistorialPage, this.SucProv.selectedSucursalItem = Object.assign({}, sucursalItem))
  }

  goEditArquitectura(idSucursal){
    this.navCtrl.push(AdminSucursalCroquisPage, {idSucursal:idSucursal});
  }
  goEditPerfilImagen(uid){
    this.navCtrl.push(AdminSucursalEditperfilImagenPage, {uid: uid});
  }

  goEditImagenCroquis(idSucursal){
    this.navCtrl.push(ImagencroquisPage,{idSucursal:idSucursal});
  }

  agregarArea(idSucursal){
    let alert = this.alertCtrl.create({
      title: 'Agregar Área',
      inputs: [
        {
          name: 'area',
          placeholder: 'Area'
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
          text: 'Registrar',
          handler: data => {

            this.registrarArea(data.area, idSucursal);

          }
        }
      ]
    });
    alert.present();
  }

  registrarArea(area, idSucursal){



        if (area == '') {

          this.alertCtrl.create({
            title: 'El nombre del área es obligatorio',
            buttons: ['Aceptar']
          }).present();

        }  else {
            this.SucProv.agregarArea(area, idSucursal);
        }

  }

  getAreas() {
    this.SucProv.getAreas(this.sucursal).subscribe(areas => {
      this.areas = areas;
      let longitud = this.areas.length;
      console.log("Esta es la longitud: ",longitud);

      console.log("Areas JAJA: ", this.areas);
    });
  }

  getZonas() {
    this.SucProv.getZonas(this.sucursal).subscribe(zonas => {
      this.zonas = zonas;
      console.log("Zonas: ", this.zonas);
    });
  }

  agregarZona(idArea, idSucursal){
    let alert = this.alertCtrl.create({
      title: 'Agregar Zona',
      inputs: [
        {
          name: 'zona',
          placeholder: 'Zona'
        },
        {
          name: 'consumoMin',
          placeholder: 'Consumo Mínimo',
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
          text: 'Registrar',
          handler: data => {

            this.registrarZona(data.zona,data.consumoMin, idArea, idSucursal);

          }
        }
      ]
    });
    alert.present();
  }

  agregarMesa(idSucursal, idArea, idZona){
    let alert = this.alertCtrl.create({
      title: 'Agregar Mesas',
      inputs: [
        {
          name: 'numMesas',
          placeholder: 'Número de mesas',
          type: 'Number'
        },
        {
          name: 'numPersonas',
          placeholder: 'Número de personas por mesa',
          type: 'Number'
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
          text: 'Registrar',
          handler: data => {

            this.registrarMesa(idSucursal, idArea,idZona, data.numMesas, data.numPersonas);
          }
        }
      ]
    });
    alert.present();
  }

  registrarZona(zona,consumoMin, idArea, idSucursal){



    if (zona == '') {

      this.alertCtrl.create({
        title: 'El nombre de la zona es obligatorio',
        buttons: ['Aceptar']
      }).present();

    } else if(consumoMin ==''){
      this.alertCtrl.create({
        title:'El consumo mínimo es obligatorio',
        buttons:['Aceptar']
      }).present();
    } else {

        this.SucProv.agregarZona(zona, consumoMin, idArea, idSucursal);
    }

}

registrarMesa(idSucursal, idArea,idZona, numMesas, numPersonas){



  if (numMesas == '') {

    this.alertCtrl.create({
      title: 'El número de mesas es obligatorio',
      buttons: ['Aceptar']
    }).present();

  }else if (numPersonas == '') {

    this.alertCtrl.create({
      title: 'El número de personas por mesa es obligatorio',
      buttons: ['Aceptar']
    }).present();

  } else {
      this.SucProv.verificarConsecutivo(idSucursal, idArea, idZona, numMesas, numPersonas);
  }

}

eliminarZona(idZona){
  let alert = this.alertCtrl.create({
    title: 'Eliminar Zona',
    subTitle: 'Esta seguro que desea eliminar la zona',
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

          this.SucProv.eliminarZona(idZona);

        }
      }
    ]
  });
  alert.present();
}

eliminarArea(idArea){

  let alert = this.alertCtrl.create({
    title: 'Eliminar Área',
    subTitle: 'Esta seguro que desea eliminar el área',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
          // this.navCtrl.setPages([{page:'AdminSucursalPerfilPage'}]);
        }
      },
      {
        text: 'Aceptar',
        handler: data => {

          this.SucProv.eliminarArea(idArea);

        }
      }
    ]
  });
  alert.present();
}

eliminarSucursal(idSucursal){
  let alert = this.alertCtrl.create({
    title: 'Eliminar sucursal',
    subTitle: 'Esta seguro que desea eliminar la sucursal',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
          // this.navCtrl.setPages([{page:'AdminSucursalPerfilPage'}]);

        }
      },
      {
        text: 'Aceptar',
        handler: data => {
          this.SucProv.eliminarSucursal(idSucursal);
        }
      }
    ]
  });
  alert.present();

  //this.navCtrl.setPages([{page:'AdminSucursalListPage'}]);
  //  this.navCtrl.push(AdminSucursalListPage);
    this.navCtrl.setRoot(AdminSucursalListPage);

}

modificaZona(idZona, zona, consumo){
      let alert = this.alertCtrl.create({
        title: 'Modificar Zona',
        inputs: [
          {
            name: 'zonaName',
            value: zona
          },
          {
            name: 'consumoMin',
            value: consumo,
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
              // this.navCtrl.setPages([{page:'AdminSucursalPerfilPage'}]);
            }
          },
          {
            text: 'Actualizar',
            handler: data => {

              this.modificarZona(data.zonaName, data.consumoMin, idZona);

            }
          }
        ]
      });
      alert.present();

}

modificaArea(idArea, area){
      let alert = this.alertCtrl.create({
        title: 'Modificar Area',
        inputs: [
          {
            name: 'areaName',
            value: area
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
            text: 'Actualizar',
            handler: data => {

              this.modificarArea(data.areaName, idArea);
            }
          }
        ]
      });
      alert.present();

}

modificarZona(zona, consumoMin, idZona){
  if (zona == '') {

    this.alertCtrl.create({
      title: 'El nombre de la zona es obligatorio',
      buttons: ['Aceptar']
    }).present();

  } else if(consumoMin == ''){
    this.SucProv.alertCtrl.create({
      title:'El consumo mínimo es obligatorio',
      buttons:['Aceptar']
    }).present();
  } else {

      this.SucProv.modificarZona(zona, consumoMin, idZona);

  }
}

modificarArea(area, idArea){



  if (area == '') {

    this.alertCtrl.create({
      title: 'El nombre del area es obligatorio',
      buttons: ['Aceptar']
    }).present();

  }  else {

      this.SucProv.modificarArea(area, idArea);

  }
}

adminMesas(idArea, idZona){
  // console.log('Id del Area', idArea ,'Id de la zona: ',idZona);
  // this.navCtrl.push(AdminSucursalPerfilPage, {uid:uid});
  this.navCtrl.push('AdminmesasPage', {idArea: idArea, idZona: idZona});
}

}
