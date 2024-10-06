import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Platform } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  icono = 'Dark';
  viajes: any[] = [];
  usuarios: any[] = [];
  input = ""

  autocompleteItems!: any[];

  distancia = ""

  duracion = ""

  selectedSegment = 'default';

  @ViewChild('map') mapElement: ElementRef | undefined;

  public map: any;

  public start: any = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";

  public end: any = "Pomaire";

  public directionsService: any;

  public directionsDisplay: any;
  constructor(private router: Router, public funciones: FuncionesCompartidasService, public zone: NgZone, private platform: Platform) {
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

  ionViewDidEnter() {
    this.getViajePasajero();
    this.platform.ready().then(() => {

      this.initMap()

    })
   
  }
  getViajePasajero() {
    const usuarioConectado = this.funciones.usuarioLogeado;
    const viajeDelUsuario = this.viajes.find(viaje => {
      return viaje.pasajeros.some((pasajero: { usuario: any; }) => pasajero.usuario === usuarioConectado);
    });
    if (viajeDelUsuario) {
      console.log(viajeDelUsuario)
      this.funciones.showToast('Ya eres Pasajero en un viaje!');
      this.navegar('transporte2');
    } else {
      console.log('No hay viajes para el usuario conectado')
    }
  }
  entrarAlViaje(usuarioviajeP: string) {
    if (!this.viajes || this.viajes.length === 0) {
      console.log('No hay viajes disponibles');
    }

    const viaje = this.viajes.find(viaje => viaje.conductor === usuarioviajeP);

    const conductor = this.viajes.find(viaje => viaje.conductor === this.funciones.usuarioLogeado);

    if (conductor) {
      console.log('No puedes entrar a tu propio viaje');
      this.funciones.showToast('No puedes entrar a tu propio viaje');
      return;
    }

    if (viaje) {
      const pasajeros: any[] = viaje.pasajeros;
      console.log('Viaje encontrado:', viaje);
      const pasajeroExiste = pasajeros.find(pasajero => pasajero === this.funciones.usuarioLogeado);
      if (pasajeroExiste) {
        console.log('Ya está registrado en el viaje');
        this.funciones.showToast('Ya está registrado en el viaje');
        this.navegar('transporte2');
      } else {
        pasajeros.push({ usuario: this.funciones.usuarioLogeado, destino: 'No especificado', pago: 'No Especificado', imagenTransferencia: 'No Especificado' });
        console.log('Pasajero registrado en el viaje');
        this.funciones.showToast('Pasajero registrado en el viaje');
        localStorage.setItem('viajes', JSON.stringify(this.viajes));
        this.navegar('transporte2');
      }
    } else {
      console.log('No se encontró el viaje para el usuario logeado:' + this.funciones.usuarioLogeado);
    }
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

        }

      );

    }
    this.directionsDisplay.setMap(this.map);

    this.calculateAndDisplayRoute();

  }





  calculateAndDisplayRoute(end?: string) {

    this.directionsService.route({

      origin: this.start,

      destination: end,

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
