import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ViewController
} from "ionic-angular";
import { GestionReservacionesProvider } from "../../providers/gestion-reservaciones/gestion-reservaciones";

@IonicPage()
@Component({
  selector: "page-modalmesas",
  templateUrl: "modalmesas.html"
})
export class ModalmesasPage {
  idZona: any;
  idReserv: any;
  mesas: any[];
  items: any[] = [];
  ids: any[] = [];
  prueba: any[];
  reservacion: any = {};
  horas: any = { };
  estatus:  boolean = false;
  hora: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private reservProv: GestionReservacionesProvider
  ) {
    this.idReserv = this.navParams.get("idReserv");
    console.log("Id Reserv: ", this.idReserv);

    this.idZona = this.navParams.get("idZona");
    console.log("Zona: ", this.idZona);
  }

  ionViewDidLoad() {
    this.getMesas();
  }

  getMesas() {
    this.reservProv.getMesas(this.idZona).subscribe(mesas => {
      this.mesas = mesas;
      let longitud = this.mesas.length;
      console.log("Esta es la longitud: ", longitud);

      console.log("mesas JAJA: ", this.mesas);
    });
  }

  selecMesa(idMesa, noMesa){
    this.reservProv.getOneReservación(this.idReserv).subscribe(reservacion => {
      this.reservacion = reservacion;
      console.log("Esta es la reservacion: ", this.reservacion);
      
      let reserva = {
        idReservacion: this.reservacion.idReservacion,
        fecha: this.reservacion.fechaR_,
        hora: this.reservacion.hora,
        idMesa: idMesa,
        noMesa: noMesa
      };

      this.consultaHorarios(idMesa, reserva);     

    });   
  }

  consultaHorarios(idMesa, reserva) {
    let alert = this.alertCtrl.create();
    alert.setTitle("Horarios Reservados");
    
    
    this.reservProv.getMesaReservas(idMesa, reserva).subscribe(horas =>{
      this.horas = horas;    
      // console.log("ESta afuera: ", this.horas);  
    
        for (let item of this.horas) {
          this.hora = item.hora;
          let jaja = '1';             
            alert.addInput({
              // type: 'radio',
              // label: 'blue',
              value: this.hora,
              checked: true,
              disabled: true
            });
        }  
        
      });
                
   
   
    let hora1 = "06:00 PM";
    let hora2 = "08:00 PM";
    // alert.setSubTitle(hora1
    // + "<br>" 
    // + hora2);   
    alert.addButton("Cancelar");
    alert.addButton({
      text: "Aceptar",
      handler: data => {
        this.reservProv.mesaReservacion(reserva);
        // this.testRadioOpen = false;
        // this.cancelarMotivo = data;
        // // console.log("Este es el resultado: ",this.cancelarMotivo);

        // let status = "Cancelado";
        // this.pedidosProv.cancelarServicio(
        //   this.servicioID,
        //   status,
        //   this.cancelarMotivo
        // );
        // this.mensajeCancelado(playerID, username, this.cancelarMotivo);
        // localStorage.removeItem("servIniciado");
        // localStorage.removeItem("tipoS");
        // localStorage.removeItem("yendo");
        // localStorage.removeItem("comprando");
        // localStorage.removeItem("comprado");
        // localStorage.removeItem("llevandolo");
        // localStorage.removeItem("enpuerta");
        // localStorage.removeItem("enviando");
        // this.navCtrl.setRoot("HomePage");
      }
    });
    alert.present();
  }

  // asignarMesa(idReserv,idZona){
  //   let modal = this.modalCtrl.create("ModalmesasPage",{  
  //     idReserv: idReserv,   
  //     idZona: idZona
  //   });
  //   modal.present();    
  // } 
  
  // consultarMesas() {
  //   this.reservProv.consultarMesas().subscribe(mesas => {
  //     this.mesas = mesas;
  //     console.log("Todas las mesas: ", this.mesas);
  //   });
  // }

  // selecMesa(idMesa) {
  //   this.reservProv.getOneReservación(this.idReserv).subscribe(reservacion => {
  //     this.reservacion = reservacion;
  //     console.log("Esta es la reservacion: ", this.reservacion);
      
  //     let reserva = {
  //       idReservacion: this.reservacion.idReservacion,
  //       hora: this.reservacion.fechaR_,
  //       fecha: this.reservacion.hora,
  //       idMesa: idMesa
  //     };
  //     this.reservProv.mesaReservacion(reserva);
  //   });            
  //   let items = JSON.parse(localStorage.getItem("mesas"));   
   
  //   if (items != null) {
  //     var res = items.indexOf(idMesa);

  //     if (res == -1) {
  //       let estatus = "ocupada";
  //       this.reservProv.actualizaEstatus(idMesa, estatus);
  //       console.log("No esta la mesa en el arreglo");
  //       let mesas =idMesa;
  //       this.items = JSON.parse(localStorage.getItem('mesas'));                      
  //       this.items.push(mesas);
  //       localStorage.setItem("mesas", JSON.stringify(this.items));
        
  //     } else {
  //      console.log("Esta en esta posicion del arreglo: ",res);
  //      this.items = JSON.parse(localStorage.getItem('mesas'));
  //       this.items.splice(res, 1);
  //       localStorage.setItem("mesas", JSON.stringify(this.items));
  //       let estatus = "libre";
  //       this.reservProv.actualizaEstatus(idMesa, estatus);
        
  //     }
  //   } else {  
  //     console.log("Primera vez");
      
  //     let mesas = idMesa;
  //     this.items.push(mesas);
  //     localStorage.setItem("mesas", JSON.stringify(this.items));
  //     let estatus = "ocupada";
  //     this.reservProv.actualizaEstatus(idMesa, estatus);
  //   }
  // }

  // consultarDatos() {
  //   setTimeout(() => {
  //     this.prueba = JSON.parse(localStorage.getItem("mesas"));
  //     console.log("Prueba: "+this.prueba);
      
  //   }, 100);
  // }

  Cerrar() {
    // this.reservProv.Cancelar();
    this.cerrar();
  }

  Aceptar() {
    // let mesas = JSON.parse(localStorage.getItem("mesas"));
    // // console.log("Este es el id de la reservacion: ", mesas);
    // this.reservProv.Aceptar(this.idReserv, mesas);
    this.cerrar();
  }

  cerrar() {
    this.viewCtrl.dismiss();
  }
}
