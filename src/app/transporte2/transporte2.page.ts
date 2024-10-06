import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
declare var google: any;

@Component({
  selector: 'app-transporte2',
  templateUrl: './transporte2.page.html',
  styleUrls: ['./transporte2.page.scss'],

})
export class Transporte2Page implements OnInit {
  carrito: any[] = []
  usuarios: any[] = [];
  viajes: any[] = [];
  viajeUsuario: any;
  destinoPasajero = "";
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
  image: string | undefined;
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


  constructor(private router: Router, public funciones: FuncionesCompartidasService, public zone: NgZone, private platform: Platform, public http: HttpClient) {
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
  // Método para seleccionar la imagen
  async selectImage() {
    try {
      const image: Photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl, // Usar DataUrl para la imagen
        source: CameraSource.Camera, // Usa CameraSource en lugar de "CAMERA"
        quality: 100,
      });

      this.image = image.dataUrl; // Almacena la imagen seleccionada
    } catch (error) {
      console.error('Error al seleccionar la imagen', error);
    }
  }

  // Método para subir la imagen
  uploadImage() {
    if (!this.image) {
      console.error('No hay imagen seleccionada');
      return;
    }
    // Aquí puedes manejar la lógica para subir la imagen a un servidor
    console.log('Subiendo imagen:', this.image);
  }


  actualizarViaje() {
    // Obtener la lista de viajes desde localStorage o inicializarla como un array vacío
    const viajes = JSON.parse(localStorage.getItem('viajes') || '[]');

    // Agregar el nuevo viaje a la lista
    viajes.push(this.viajeUsuario);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('viajes', JSON.stringify(viajes));

    // Si necesitas imprimir el nuevo viaje
    console.log('Nuevo viaje agregado:', this.viajeUsuario);

    this.viajeUsuario.pasajeros.forEach((pasajero: any) => {
      console.log('Pasajero:', pasajero);
    });
  }

  ngOnInit() { }
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

    this.usuarios.forEach(usuario => {
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      }
    });
    this.getViaje();
  }

  SalirViaje() {
    const usuarioLogeado = this.funciones.usuarioLogeado;

    const viajeDelUsuario = this.viajes.find(viaje => {
      return viaje.pasajeros.some((pasajero: { usuario: any; }) => pasajero.usuario === usuarioLogeado);
    });

    const Indexpasajero = viajeDelUsuario.pasajeros.findIndex((pasajero: { usuario: any; }) => pasajero.usuario === usuarioLogeado);

    viajeDelUsuario.pasajeros.splice(Indexpasajero, 1);
    localStorage.setItem('viajes', JSON.stringify(this.viajes))
    console.log(this.viajes)
    this.funciones.showToast('Has Salido Del Viaje')
    this.navegar('resumen-viaje')
  }

  actualizarDatosPasajero() {
    const usuarioConectado = this.funciones.usuarioLogeado;

    const viajeDelUsuario = this.viajes.find(viaje => {
      return viaje.pasajeros.some((pasajero: { usuario: any; }) => pasajero.usuario === usuarioConectado);
    });

    if (viajeDelUsuario) {
      const pasajero = viajeDelUsuario.pasajeros.find((p: { usuario: any; }) => p.usuario === usuarioConectado);
      if (pasajero) {
        console.log(pasajero);
        if (this.destinoPasajero === '') {
          this.funciones.showToast('Debe ingresar un destino');
          return; 
        }

        if (!this.image && this.selectedSegment === 'default') { 
          this.funciones.showToast('Debe subir una imagen de su pago');
          return;
        }
        
        pasajero.destino = this.destinoPasajero;
      
        if (this.selectedSegment === 'default') {
          pasajero.pago = 'Transferencia';
          pasajero.imagen = this.image; 
        } else {
          pasajero.pago = 'Efectivo';
          pasajero.imagen = ''; 
        }
      
        localStorage.setItem('viajes', JSON.stringify(this.viajes));
        this.funciones.showToast('Datos ingresados correctamente');
      } else {
        console.log("El usuario no es un pasajero en ningún viaje.");
      }
      
    } else {
      console.log("El usuario no es un pasajero en ningún viaje.");
    }
  }


  getViaje() {
    const viajeDelUsuario = this.viajes.find(viaje => {
      console.log("Verificando viaje:", viaje);
      return viaje.pasajeros.some((pasajero: { usuario: any; }) => pasajero.usuario === this.funciones.usuarioLogeado);
    });

    if (viajeDelUsuario) {
      console.log("El usuario conectado es un pasajero en el viaje:", viajeDelUsuario);
      this.viajeUsuario = viajeDelUsuario
      this.end = viajeDelUsuario.destino
    } else {
      console.log("El usuario conectado no es un pasajero en ninguno de los viajes.");
    }

  }

  onSegmentChange(event: any) {
    this.selectedSegment = event.detail.value;

    if (this.selectedSegment === 'default') {
      // Realizar acción para "Transferencia"
      console.log("Transferencia seleccionada");
    } else if (this.selectedSegment === 'segment') {
      // Realizar acción para "Efectivo"
      console.log("Efectivo seleccionado");
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
