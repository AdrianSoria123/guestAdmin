import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController
} from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CargaArchivoProvider } from "../../providers/carga-archivo/carga-archivo";
import { AngularFirestore } from "@angular/fire/firestore";
import { ReservacionProvider } from "../../providers/reservacion/reservacion";
import { CartaPage } from "../carta/carta";

@IonicPage()
@Component({
  selector: "page-reservaciones",
  templateUrl: "reservaciones.html"
})
export class ReservacionesPage {
  idSucursal: any;
  sucursal: any = {};
  arquitectura: any = {};
  myForm: FormGroup;
  data: any = {};
  areas: any;
  zonas: any;
  mesas: any;
  public ocultar: boolean = false;
  public areaKey: any;
  Sucursal: string = "reservar";

  evento: any;
  people = 0;
  fechaActual: any;
  disabledFecha: boolean = false;
  idReservacion: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public afDB: AngularFireDatabase,
    public fb: FormBuilder,
    public _cap: CargaArchivoProvider,
    public _providerReserva: ReservacionProvider,
    public afs: AngularFirestore
  ) {
    this.idSucursal = this.navParams.get("idSucursal");
    this.evento = this.navParams.get("uid");
    this.idReservacion = this.navParams.get("idReservacion");
    if (this.evento != null) {
      this.evento = this.navParams.get("uid");
    } else {
      this.evento = null;
    }
    this.afs
      .collection("sucursales")
      .doc(this.idSucursal)
      .valueChanges()
      .subscribe(data => {
        this.sucursal = data;
        console.log(this.sucursal);
      });

    this.myForm = this.fb.group({
      hora: [" ", [Validators.required]],
      fecha: ["", [Validators.required]],
      area: [" ", [Validators.required]],
      zona: ["", [Validators.required]]
    });

    console.log("Area seleccionada: ", this.data.area);
  }

  ionViewDidLoad() {
    if (this.evento != null) {
      this.getDetails();
      this.disabledFecha = true;
    }
    if (this.idReservacion != null) {
      this.loadReservacion(this.idReservacion);
    }
    this.getAreas(this.idSucursal);
    console.log("ionViewDidLoad EventoDetallePage");
    this.fechaActual = new Date().toJSON().split("T")[0];
    console.log("horaActual Actual: ");
  }

  goBack(idReservacion) {
    if (this.idReservacion != null) {
      this.navCtrl.popToRoot().then(() => {
        this._providerReserva.deleteReservacion(idReservacion);
        localStorage.removeItem("idReservacion");
        localStorage.removeItem("idSucursal");
        localStorage.removeItem("uidEvento");
      });
    } else {
      this.navCtrl.popToRoot();
    }
  }

  getDetails() {
    this._cap.getEvento(this.evento).then(e => {
      this.data = e;
      console.log("evento", this.data.plano);
    });
  }

  loadReservacion(idx) {
    this._providerReserva.getReservacion(idx).subscribe(reservacion => {
      if (reservacion != null) {
        this.people = reservacion.numPersonas;
        this.data.hora = reservacion.hora;
        this.data.area = reservacion.idArea;
        this._getZonas(this.data.area);
        this.data.zona = reservacion.idZona;
      }
    });
  }

  increment() {
    if (this.people < 20) {
      this.people++;
    }
  }

  decrement() {
    if (this.people > 0) {
      this.people--;
    }
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

  _getZonas(_area) {
    const idx = this.idSucursal;
    this._providerReserva.getZonas(idx, _area).subscribe(zonas => {
      console.log("zona", zonas);
      this.zonas = zonas;
    });
  }

  alertConsumo() {
    const zona = this.data.zona;
    this._providerReserva.getZona(zona).subscribe(zona => {
      const formatter = new Intl.NumberFormat("en-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2
      });
      const x = formatter.format(zona.consumo); // "$1,000.00"
      console.log(x);
      let alertMesas = this.alertCtrl.create({
        message:
          "<div text-center> Esta zona cuenta con un consumo sugerido de " +
          "<br><br>" +
          "<b>" +
          formatter.format(zona.consumo) +
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
    });
  }

  getMesas() {
    const idx = this.idSucursal;
    const area = this.data.area;
    const zonas = this.data.zona;
    this._providerReserva.getMesas(idx, area, zonas).subscribe(mesas => {
      this.mesas = mesas;
      console.log("Mesas : ", this.mesas);
      const _mesas = mesas.length;
      console.log("Mesas : ", _mesas);
      const _personas = this.mesas.reduce(
        (acc, obj) => acc + obj.numPersonas,
        0
      );
      console.log("Personas : ", _personas);

      // this.alertMesas(_mesas, _personas);
    });
  }

  alertMesas(mesas, personas) {
    let alertMesas = this.alertCtrl.create({
      message:
        "<div text-center> Esta zona cuenta con " +
        "<b>" +
        mesas +
        "</b>" +
        " mesas y con " +
        "<b>" +
        personas +
        "</b>" +
        " lugares disponibles. </div>",
      buttons: [
        {
          text: "Atras",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
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

  reservacionAdd() {
    let alertMesas = this.alertCtrl.create({
      title: "Carta",
      message: "¿Deseas ordenar de la carta?",
      buttons: [
        {
          text: "Más Tarde",
          role: "cancel",
          handler: () => {
            console.log("Sin consumo");
            let info = {
              numPersonas: this.people,
              hora: this.data.hora,
              fecha: this.data.fecha,
              area: this.data.area,
              zona: this.data.zona,
              idSucursal: this.idSucursal,
              idevento: this.evento
            };
            this._providerReserva
              .saveReservacion(info)
              .then((respuesta: any) => {
                console.log("Respuesta: ", respuesta);
              });
          }
        },
        {
          text: "Aceptar",
          handler: () => {
            console.log("Con consumo");
            let info = {
              numPersonas: this.people,
              hora: this.data.hora,
              fecha: this.data.fecha,
              area: this.data.area,
              zona: this.data.zona,
              idSucursal: this.idSucursal,
              idevento: this.evento
            };
            this._providerReserva
              .saveReservacion(info)
              .then((respuesta: any) => {
                console.log("Respuesta: ", respuesta);
                if (respuesta.success == true) {
                  console.log("Success: ", respuesta.success);
                  localStorage.setItem(
                    "idReservacion",
                    respuesta.idReservacion
                  );
                  localStorage.setItem("idSucursal", this.idSucursal);
                  localStorage.setItem("uidEvento", this.evento);
                  localStorage.setItem('reservacion', 'true');

                  this.navCtrl.push(CartaPage, {
                    idReservacion: respuesta.idReservacion,
                    idSucursal: this.idSucursal,
                    uid: this.evento
                  });
                }
              });
          }
        }
      ]
    });
    alertMesas.present();
  }

  reservacionUpdate(idReservacion) {
    let alertMesas = this.alertCtrl.create({
      title: "Carta",
      message: "¿Deseas ordenar de la carta?",
      buttons: [
        {
          text: "Declinar",
          role: "cancel",
          handler: () => {
            console.log("Sin consumo");
            let info = {
              numPersonas: this.people,
              hora: this.data.hora,
              fecha: this.data.fecha,
              area: this.data.area,
              zona: this.data.zona,
              idSucursal: this.idSucursal,
              idevento: this.evento
            };
            this._providerReserva
              .updateReservacion(idReservacion, info)
              .then((respuesta: any) => {
                console.log("Respuesta: ", respuesta);
              });
          }
        },
        {
          text: "Aceptar",
          handler: () => {
            console.log("Con consumo");
            let info = {
              numPersonas: this.people,
              hora: this.data.hora,
              fecha: this.data.fecha,
              area: this.data.area,
              zona: this.data.zona,
              idSucursal: this.idSucursal,
              idevento: this.evento
            };
            this._providerReserva
              .updateReservacion(idReservacion, info)
              .then((respuesta: any) => {
                console.log("Respuesta: ", respuesta);
                if (respuesta.success == true) {
                  console.log("Success: ", respuesta.success);
                  localStorage.setItem("idReservacion", idReservacion);
                  let cartaModal = this.modalCtrl.create(CartaPage, {
                    idReservacion: idReservacion
                  });
                  cartaModal.present();
                }
              });
          }
        }
      ]
    });
    alertMesas.present();
  }

  areaSeleccionada() {
    console.log("Esta es el área: " + this.data.area);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ReservacionesPage');
  // }
  ocultarClic() {
    this.ocultar = !this.ocultar;
    this.checkActiveButton();
  }

  checkActiveButton() {
    if (this.ocultar) {
      this.ocultar = true;
    } else if (!this.ocultar) {
      this.ocultar = false;
    }
  }
}
