import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Router } from '@angular/router';
declare var google: any;


@Component({
  selector: 'app-viaje2',
  templateUrl: './viaje2.page.html',
  styleUrls: ['./viaje2.page.scss'],
})
export class Viaje2Page implements OnInit {
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

  constructor(private router: Router, public funciones: FuncionesCompartidasService, public ngZone: NgZone) {}

  ionViewDidEnter() {
    this.ngZone.run(() => {
      this.loadMap();
      var botones = document.querySelectorAll('.gmnoprint');
    });

  }
  ngOnInit() {}


  loadMap() {
    const mapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15 ,
      disableDefaultUI: true
    };
  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.infoWindow = new google.maps.InfoWindow();
  
    const locationButton = document.createElement('button');
    locationButton.textContent = 'Pan to Current Location';
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
            this.infoWindow.setContent('Location found.');
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
  
  // Nueva función para aplicar estilos personalizados
  applyCustomButtonStyles(button: HTMLElement) {
    button.style.backgroundColor = 'var(--fondo1)'; // Usar la variable --fondo1 para el fondo
    button.style.color = 'var(--log)';
    button.style.border = 'none'; // Opcional: elimina el borde si es necesario
    button.style.padding = '10px'; // Ajustar el padding para mejorar la presentación
    button.style.borderRadius = '5px'; // Redondear bordes del botón
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
