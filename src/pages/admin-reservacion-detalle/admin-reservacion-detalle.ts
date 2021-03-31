import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { MonitoreoReservasProvider } from '../../providers/monitoreo-reservas/monitoreo-reservas';


@IonicPage()
@Component({
  selector: 'page-admin-reservacion-detalle',
  templateUrl: 'admin-reservacion-detalle.html',
})
export class AdminReservacionDetallePage {
  idReservacion: any;
  reservaciones: any= {};
  Areas: any;
  Zonas: any;
  Eventos: any;
  Productos: any;
  productos_total: any;
  total_final: any;
  Cupones: any;
  cuentasCompartidas: any;
  infoUsers: any;
  infoReserCom: any;
  infoReserCom_num: any;
  infoReservacion: any;
  validarCupon: any;
  propinaRe: any;
  propinaRe2: any;
  totalPropinaCupon: any;
  totalPropina: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public monRes: MonitoreoReservasProvider,
              public afs: AngularFirestore) {
          //recibe parametro de la reservacion
          this.idReservacion = this.navParams.get("idReservacion");
          console.log('idReservacion', this.idReservacion);
          //Traer datos de la reservacion seleccionada
          this.afs.collection('reservaciones').doc(this.idReservacion).valueChanges().subscribe( reservacion => {
          this.reservaciones= reservacion;
          console.log('reservacion doc', this.reservaciones);
        });
        //consultar tabla areas
        this.afs
          .collection("areas")
          .valueChanges()
          .subscribe(data => {
            this.Areas = data;
            console.log('areas doc', this.Areas);
          });
          //consultar tabla zonas
          this.afs
            .collection("zonas")
            .valueChanges()
            .subscribe(data1 => {
              this.Zonas = data1;
                console.log('zonas doc', this.Zonas);
            });
            //consultar tabla eventos
            this.afs
              .collection("evento")
              .valueChanges()
              .subscribe(data2 => {
                this.Eventos = data2;
              });
              //consultar tabla productos
              this.afs
                .collection("productos")
                .valueChanges()
                .subscribe(data3 => {
                  this.Productos = data3;
                    console.log('productos doc', this.Productos);
                });
                //consultar tabla productos
                this.afs
                  .collection("cupones")
                  .valueChanges()
                  .subscribe(data10 => {
                    this.Cupones = data10;
                      console.log('cupones doc', this.Cupones);
                  });
                  //consultar tabla compartidas
        this.afs
          .collection("compartidas")
          .valueChanges()
          .subscribe(data11 => {
            this.cuentasCompartidas = data11;
              console.log("compartidas", this.cuentasCompartidas);
          });
          //consultar tabla users
          this.afs
            .collection("users")
            .valueChanges()
            .subscribe(data12 => {
              this.infoUsers = data12;
              console.log("usuarios", this.infoUsers);
            });

            //ver si la reservacioon existe en las compartidas
        this.monRes.getReserCom(this.idReservacion).subscribe(res11 => {
          this.infoReserCom = res11;
          this.infoReserCom_num = this.infoReserCom.length;
          console.log("Este es el resultado de compartidas: ",  this.infoReserCom_num);
        });

        //sacar totales con propina y cupon
        this.monRes.getInfo(this.idReservacion).subscribe(res2 => {
      this.infoReservacion = res2;
      console.log("Este es el resultado de reservacion: ",this.infoReservacion);
      if(res2[0].uidCupon==undefined){
         this.validarCupon='Noexiste';
         // total de general dependiendo los productos que tenga la reservacion
           this.monRes.getProductos(this.idReservacion).subscribe(productos => {
             this.productos_total = productos;
              console.log('productos todos',this.productos_total);
             this.total_final = this.productos_total.reduce((acc, obj) => acc + obj.total, 0);
              this.propinaRe2=this.total_final*res2[0].propina;
              this.totalPropina= this.total_final+this.propinaRe2;
             console.log('productos total',this.total_final);
           });
       }else{
          this.validarCupon='Existe';
           console.log('validar cupon', this.validarCupon);
          this.propinaRe=res2[0].totalReservacion*res2[0].propina;
          const propinaCalculo=res2[0].totalReservacion*res2[0].propina;
          this.totalPropinaCupon=res2[0].totalReservacion+propinaCalculo;
          console.log('descuenton',res2[0].totalReservacion);
          console.log('propina',res2[0].propina);
          console.log('propina y cupon',this.totalPropinaCupon);
        }
    });

  }



}
