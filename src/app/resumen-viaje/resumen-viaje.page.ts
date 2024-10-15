import { Component, OnInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-viaje',
  templateUrl: './resumen-viaje.page.html',
  styleUrls: ['./resumen-viaje.page.scss'],
})
export class ResumenViajePage implements OnInit {
  isModalOpen = false;
  viajeUsuario: any;
  constructor(public funciones: FuncionesCompartidasService, private router: Router) { }

  ngOnInit() {
    this.obtenerViaje();
  }

  ionViewWillEnter() {
    this.obtenerViaje()
  }

  ionViewWillLeave() {

  }


  obtenerViaje() {
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]')
    const usuarioLogeado = this.funciones.usuarioLogeado;
    if (viajes && usuarioLogeado) {
      console.log(this.viajeUsuario)
      this.viajeUsuario = viajes.find((viaje: any) => viaje.conductor === usuarioLogeado);
      const viajepasajero = viajes.find((viaje: { pasajeros: { usuario: any; }[]; }) => {
        return viaje.pasajeros.some((pasajero: { usuario: any; }) => pasajero.usuario === usuarioLogeado);
      });

      console.log(viajepasajero)
      this.viajeUsuario = viajepasajero
      console.log(this.viajeUsuario)
      console.log('a')
    }
  }
  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cambiarTema() {
    this.funciones.cambiarTema();
  }
  obtenerIcono() {
    return this.funciones.getIcono();
  }
}
