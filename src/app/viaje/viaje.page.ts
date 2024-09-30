import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})

export class ViajePage implements OnInit {
  public viajes: any[] = [];
  usuarios: any[] = [];
  destino: string = "";
  puntoEncuentro: string = "";
  cantidadPasajeros: number = 0;
  horaSalida = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
    hour12: false,
  });
  MontoCobrar: number = 0;
  comentarios: string = "";
  


  constructor(private router: Router, public funciones: FuncionesCompartidasService) { }
  ngOnInit() {
  }
  ionViewDidEnter() {
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
  
  VerificarCampos() {
    if (this.destino === "" || this.puntoEncuentro === "" || this.cantidadPasajeros === 0 || this.MontoCobrar === 0) {
      this.funciones.showToast('Debe llenar todos los campos!');
    } else {
      this.registrarViaje();
    }
  }

  registrarViaje() {
    const viaje = { "conductor":this.funciones.usuarioLogeado , "destino": this.destino, "puntoEncuentro": this.puntoEncuentro, "cantidadPasajeros": this.cantidadPasajeros, "horaSalida": this.horaSalida, "MontoCobrar": this.MontoCobrar, "comentarios": this.comentarios, "pasajeros": [], "estado": "En espera" };
    this.viajes.push(viaje);
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
    this.funciones.showToast('Viaje con destino a '+viaje.destino+ ' Registrado!');
    this.navegar('viaje2');
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
