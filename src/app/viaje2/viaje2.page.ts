import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
declare var google: any;


@Component({
  selector: 'app-viaje2',
  templateUrl: './viaje2.page.html',
  styleUrls: ['./viaje2.page.scss'],
})

export class Viaje2Page {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map!: any;
  infoWindow!: any;
  mapStyles = [
    {
      featureType: 'all',
      elementType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        { lightness: 100 },
        { visibility: 'simplified' }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        { color: '#00bfa5' }
      ]
    }
  ];

  fecha = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  hora = new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: undefined,
    hour12: false,
  });
  usuarios: any[] = [];
  viajes: any[] = [];
  viajeUsuario: any;
  constructor(private router: Router, public funciones: FuncionesCompartidasService, public ngZone: NgZone) {
    if (localStorage.getItem('usuarios')) {
      this.usuarios = JSON.parse(localStorage.getItem('usuarios')!);
    }
    if (localStorage.getItem('viajes')) {
      this.viajes = JSON.parse(localStorage.getItem('viajes')!);
    }
    this.usuarios.forEach(usuario => {
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      }
    });
  }

  actualizarViaje(){
    if (localStorage.getItem('viajes')) {
      this.viajes = JSON.parse(localStorage.getItem('viajes')!);
    }
  }
  getTotal() {
    const monto = parseFloat(this.viajeUsuario?.MontoCobrar) || 0;
    const cantidad = parseFloat(this.viajeUsuario?.cantidadPasajeros) || 0;
    return monto * cantidad;
  }

  ionViewDidEnter() {
    this.ngZone.run(() => {
      this.loadMap();
    });
    if (localStorage.getItem('usuarios')) {
      this.usuarios = JSON.parse(localStorage.getItem('usuarios')!);
    }
    if (localStorage.getItem('viajes')) {
      this.viajes = JSON.parse(localStorage.getItem('viajes')!);
    }
    this.usuarios.forEach(usuario => {
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      }
    });
  }

  ionViewWillEnter() {
    if (localStorage.getItem('usuarios')) {
      this.usuarios = JSON.parse(localStorage.getItem('usuarios')!);
    }
    if (localStorage.getItem('viajes')) {
      this.viajes = JSON.parse(localStorage.getItem('viajes')!);
    }
    this.getViaje();
    this.usuarios.forEach(usuario => {
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      }
    });
  }

  getViaje() {
    if (!this.viajes || this.viajes.length === 0) {
      console.log('No hay viajes disponibles');
    }

    if (!this.funciones.usuarioLogeado) {
      console.log('No hay ningún usuario logeado');
    }

    const viaje = this.viajes.find(viaje => viaje.conductor === this.funciones.usuarioLogeado);

    if (viaje) {
      console.log('Viaje encontrado:', viaje);
      this.viajeUsuario = viaje;
      console.log(this.viajeUsuario)
    } else {
      console.log('No se encontró el viaje para el usuario logeado:', this.funciones.usuarioLogeado);
    }
  }
  cambiarEstadoViaje(texto:string) {
    this.viajeUsuario.estado = texto;
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
    this.funciones.showToast('Viaje iniciado');
  }

  loadMap() {
    const mapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
      disableDefaultUI: true,
      mapTypeControl: false,    // Desactiva el control de tipo de mapa
      zoomControl: true,        // Mantiene el control de zoom activo
      streetViewControl: false, // Desactiva el control de Street View
      fullscreenControl: false, // Desactiva el control de pantalla completa
      scaleControl: true,
      gestureHandling: 'greedy', // Optimizar gestos táctiles
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement('button');
    locationButton.textContent = 'Tu Ubicacion Actual';
    locationButton.classList.add('custom-map-control-button');
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    // Aplicar el estilo con variables CSS
    this.applyCustomButtonStyles(locationButton);

    locationButton.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            this.infoWindow.setPosition(pos);
            this.infoWindow.setContent('<div id="locationbtn">Estas Aqui!</div>');
            this.infoWindow.open(this.map);
            this.map.setCenter(pos);
          },
          () => {
            this.handleLocationError(true, this.infoWindow, this.map.getCenter());
          }
        );
      } else {
        this.handleLocationError(false, this.infoWindow, this.map.getCenter());
      }
    });
    setTimeout(() => {
      const satelliteButton = document.querySelector('button[title="Mostrar imágenes satelitales"]');
      if (satelliteButton) {
        satelliteButton.classList.add('hidden-button');
      }
    }, 1000);
    locationButton.click();
  }

  applyCustomButtonStyles(button: HTMLElement) {
    button.style.backgroundColor = 'var(--fondo1)';
    button.style.color = 'var(--log)';
    button.style.border = 'none';
    button.style.padding = '10px';
    button.style.borderRadius = '5px';
  }

  handleLocationError(browserHasGeolocation: boolean, infoWindow: any, pos: any) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }

  navegar(ruta: string) {
    this.router.navigate([ruta]);
  }

  cambiarTema() {
    this.funciones.cambiarTema();
  }

  obtenerIcono() {
    return this.funciones.getIcono();
  }

}
