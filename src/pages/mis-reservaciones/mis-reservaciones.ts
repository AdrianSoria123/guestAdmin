import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MonitoreoReservasProvider } from '../../providers/monitoreo-reservas/monitoreo-reservas';
import { BarcodeScanner, BarcodeScannerOptions} from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-mis-reservaciones',
  templateUrl: 'mis-reservaciones.html',
})
export class MisReservacionesPage {
  options: BarcodeScannerOptions;
  encodText: string = '';
  encodeData: any = {};
  scannedData: any = {};

  reservaciones: any;
  clientes: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public monRes: MonitoreoReservasProvider,
              private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    this.getAllReservacione();
    this.getClientes();
  }

  getAllReservacione() {
    const id = 'fc5oP4WuwVWbrIhcF4mr6tzWKqA3';
    this.monRes.getMisreservaciones(id).then( r =>  {
      this.reservaciones = r;
      console.log("Reservaciones: ",this.reservaciones);
      
    });
  }
  getClientes() {
    this.monRes.getAllClientes("users").then(c =>{
          this.clientes = c;
          console.log("Estos son los clientes: ",this.clientes);            
        });
  }

  scan() {
    this.options = {
      prompt: 'putos todos'
    };
    this.barcodeScanner.scan(this.options).then((data) => {
      this.scannedData = data;
    }, (err) => {
      console.log('Error', err);      
    })
  }

}
