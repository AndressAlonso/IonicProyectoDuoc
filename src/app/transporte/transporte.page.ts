import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  icono = 'Dark';
  viajes: any[] = [];
  usuarios: any[] = [];
  constructor(private router: Router, public funciones: FuncionesCompartidasService) {
    if (localStorage.getItem('viajes')) {
      this.viajes = JSON.parse(localStorage.getItem('viajes')!);
    }
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }
    this.usuarios.forEach(usuario => {
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      }
    });
  }
  ngOnInit() {

  }
  entrarAlViaje(usuarioviajeP: string) {
    if (!this.viajes || this.viajes.length === 0) {
      console.log('No hay viajes disponibles');
    }


    const viaje = this.viajes.find(viaje => viaje.conductor === usuarioviajeP);

  
    if (viaje) {
      const pasajeros:any[] = viaje.pasajeros;
      console.log('Viaje encontrado:', viaje);
      const pasajeroExiste = pasajeros.find(pasajero => pasajero === this.funciones.usuarioLogeado);
      if (pasajeroExiste) {
        console.log('Ya está registrado en el viaje');
        this.funciones.showToast('Ya está registrado en el viaje');
      } else {
        pasajeros.push({usuario: this.funciones.usuarioLogeado, destino: 'No especificado', pago: 'No Especificado'});
        console.log('Pasajero registrado en el viaje');
        this.funciones.showToast('Pasajero registrado en el viaje');
        localStorage.setItem('viajes', JSON.stringify(this.viajes));
        this.navegar('transporte2');
      }
    } else {
      console.log('No se encontró el viaje para el usuario logeado:');
    }
  }
  navegar(page: string) {
    this.router.navigate([page]);
  }
  cambiarTema() {
    this.funciones.cambiarTema();
  }
  obtenerIcono() {
    return this.funciones.getIcono();
  }
}
