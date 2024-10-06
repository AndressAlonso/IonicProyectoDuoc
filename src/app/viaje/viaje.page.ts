import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Platform } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})

export class ViajePage implements OnInit {
  public viajes: any[] = [];
  viajeUsuario: any;
  usuarios: any[] = [];
  input = ""
  destino: string = "";
  puntoEncuentro: string = "";
  cantidadPasajeros: number = 0;
  autocompleteItems!: any[];
  horaSalida = '00:00';
  mostrarAutocomplete: boolean = false;
  MontoCobrar: number = 0;
  comentarios: string = "";
  isError: boolean = false; // Variable para controlar el error


  constructor(private router: Router, public funciones: FuncionesCompartidasService, public zone: NgZone, private platform: Platform) { }
  ngOnInit() {
  }

  mostrarRutas() {
    this.mostrarAutocomplete = true;
  }

  // Oculta el autocompletado cuando el input pierde el foco
  ocultarRutas() {
    setTimeout(() => {
      this.mostrarAutocomplete = false;
    }, 200); // Un pequeño retardo para que se pueda seleccionar un elemento
  }
  updateSearchResults() {

    let GoogleAutocomplete = new google.maps.places.AutocompleteService();

    if (this.destino == '') {

      this.autocompleteItems = [];

      return;

    }

    GoogleAutocomplete!.getPlacePredictions({ input: this.destino },

      (predictions: any, status: any) => {

        this.autocompleteItems = [];

        this.zone.run(() => {

          predictions.forEach((prediction: any) => {

            this.autocompleteItems!.push(prediction);
            console.log(prediction)

          });

        });

      });

  }

  selectSearchResult(item: any) {

    this.destino = item.description

    this.autocompleteItems = []

  }
 
  getViaje() {
    if (!this.viajes || this.viajes.length === 0) {
      console.log('No hay viajes disponibles');
      return false
    }

    if (!this.funciones.usuarioLogeado) {
      console.log('No hay ningún usuario logeado');
      return false
    }

    const viaje = this.viajes.find(viaje => viaje.conductor === this.funciones.usuarioLogeado);

    if (viaje) {
      console.log('Viaje encontrado:', viaje);
      this.viajeUsuario = viaje;
      console.log(this.viajeUsuario)
      return true;
    } else {
      console.log('No se encontró el viaje para el usuario logeado:', this.funciones.usuarioLogeado);
      return false;
    }
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
    if (this.getViaje()) {
      this.navegar('viaje2');
    }
  }

  VerificarCampos() {
    if (this.destino === "" || this.puntoEncuentro === "" || this.cantidadPasajeros === 0 || this.MontoCobrar === 0) {
      this.funciones.showToast('Debe llenar todos los campos!');
    } else {
      this.registrarViaje();
    }
  }

  registrarViaje() {
    const viaje = { "conductor": this.funciones.usuarioLogeado, "destino": this.destino, "puntoEncuentro": this.puntoEncuentro, "cantidadPasajeros": this.cantidadPasajeros, "horaSalida": this.horaSalida, "MontoCobrar": this.MontoCobrar, "comentarios": this.comentarios, "pasajeros": [], "estado": "En espera"}; 
    this.viajes.push(viaje);
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
    this.funciones.showToast('Viaje con destino a ' + viaje.destino + ' Registrado!');
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
