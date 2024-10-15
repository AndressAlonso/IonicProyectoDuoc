import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { NavController, Platform } from '@ionic/angular';
declare var google: any;


@Component({
  selector: 'app-viaje2',
  templateUrl: './viaje2.page.html',
  styleUrls: ['./viaje2.page.scss'],
})

export class Viaje2Page {
  carrito: any[] = []
  usuarios: any[] = [];
  viajes: any[] = [];
  viajeUsuario: any;
  input = ""

  autocompleteItems!: any[];

  distancia = ""

  duracion = ""

  @ViewChild('map') mapElement: ElementRef | undefined;

  public map: any;

  public start: any = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";

  public end: any = "Pomaire";

  public directionsService: any;
  isModalOpen = false;

  public directionsDisplay: any;
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


  constructor(private router: Router, public funciones: FuncionesCompartidasService, public zone: NgZone, private platform: Platform) {
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
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.funciones.handleBackButton();
    });
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  actualizarViaje() {
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
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
    this.platform.ready().then(() => {

      this.initMap()

    })
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
      this.end = this.viajeUsuario.destino
      console.log(this.viajeUsuario)
    } else {
      console.log('No se encontró el viaje para el usuario logeado:', this.funciones.usuarioLogeado);
    }
  }
  cambiarEstadoViaje(texto: string) {
    this.viajeUsuario.estado = texto;
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
    this.funciones.showToast(texto);
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

  EliminarViaje(){
    const viajeaEliminar = this.viajes.findIndex(viaje => viaje.conductor == this.viajeUsuario.conductor)
    console.log('Viaje a Eliminar: '+ viajeaEliminar)
    console.log(viajeaEliminar)
    console.log(this.viajes)
    this.viajes.splice(viajeaEliminar, 1)
    console.log(this.viajes)
    localStorage.setItem("viajes", JSON.stringify(this.viajes))
    this.funciones.showToast('Has Terminado el viaje!')
    this.navegar('resumen-viaje')
  }
  initMap() {

    this.directionsService = new google.maps.DirectionsService;

    this.directionsDisplay = new google.maps.DirectionsRenderer;

    // let latLng = new google.maps.LatLng(this.latitude, this.longitude);

    let mapOptions = {

      // center: latLng,

      zoom: 5,

      zoomControl: false,

      scaleControl: false,

      mapTypeControl: false,

      streetViewControl: false,

      fullscreenControl: true,

      mapTypeId: google.maps.MapTypeId.ROADMAP,

    };

    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);

    let infoWindow = new google.maps.InfoWindow();



    // Try HTML5 geolocation.

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (position: GeolocationPosition) => {

          const pos = {

            lat: position.coords.latitude,

            lng: position.coords.longitude,

          };

          // new google.maps.Marker({

          //  position: pos,

          //  map: this.map,

          // });


          infoWindow.setContent("Estas aquí.");

          infoWindow.open(this.map);

          this.map.setCenter(pos);
          this.obtenerDireccion(pos);
        }

      );

    }
    this.directionsDisplay.setMap(this.map);

    this.calculateAndDisplayRoute();

  }
  obtenerDireccion(pos: google.maps.LatLngLiteral) {
    let geocoder = new google.maps.Geocoder();
  
    geocoder.geocode({ location: pos }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          console.log("Dirección: ", results[0].formatted_address);
        } else {
          console.log("No se encontraron resultados.");
        }
      } else {
        console.log("Error en el geocodificador: " + status);
      }
    });
    
  }
  

  calculateAndDisplayRoute() {

    this.directionsService.route({

      origin: this.start,

      destination: this.end,

      travelMode: 'DRIVING'

    }, (response: any, status: string) => {

      if (status === 'OK') {

        this.directionsDisplay.setDirections(response);

        const route = response.routes[0];

        const leg = route.legs[0];

        // Distancia total

        const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);

        console.log(`Distancia: ${distanceInKilometers} km`);

        this.distancia = `${distanceInKilometers} km`;

        // Tiempo de viaje

        const durationInSeconds = leg.duration.value;

        const minutes = Math.floor(durationInSeconds / 60); // minutos

        const seconds = durationInSeconds % 60; // segundos

        const formattedDuration = `${minutes.toString().padStart(2, '0')}`;

        console.log(`Duración: ${formattedDuration} (mm:ss)`);

        this.duracion = `${formattedDuration}`;

        console.log(`Inicio: ${leg.start_address}`);

        console.log(`Destino: ${leg.end_address}`);



        // Tiempo de viaje en tráfico

        if (leg.duration_in_traffic) {

          const durationInTraffic = leg.duration_in_traffic.value / 60;

          console.log(`Tiempo de viaje en tráfico: ${durationInTraffic} minutos`);

        }





        leg.steps.forEach((step: any, index: number) => {

          const stepDistance = step.distance.value / 1000; // en km

          const stepDuration = step.duration.value / 60; // en minutos



          console.log(`Paso ${index + 1}: ${step.instructions}, Distancia: ${stepDistance} km, Tiempo: ${stepDuration} minutos`);

        });



      } else {

        window.alert('Directions request failed due to ' + status);

      }

    });

  }

  updateSearchResults() {

    let GoogleAutocomplete = new google.maps.places.AutocompleteService();

    if (this.end == '') {

      this.autocompleteItems = [];

      return;

    }

    GoogleAutocomplete!.getPlacePredictions({ input: this.end },

      (predictions: any, status: any) => {

        this.autocompleteItems = [];

        this.zone.run(() => {

          predictions.forEach((prediction: any) => {

            this.autocompleteItems!.push(prediction);

          });

        });

      });

  }

  selectSearchResult(item: any) {

    this.end = item.description

    this.autocompleteItems = []

    this.initMap()

  }

}
