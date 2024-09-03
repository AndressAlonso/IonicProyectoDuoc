import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-r-contrasena',
  templateUrl: './r-contrasena.page.html',
  styleUrls: ['./r-contrasena.page.scss'],
})
export class RContrasenaPage implements OnInit {
  
  icono = "oscuro";

  constructor() { }

  ngOnInit() {
  }

//Funcion para cambiar a modo oscuro:
cambiarTema(){
  if (this.icono == "oscuro"){
    document.documentElement.style.setProperty("--fondo1", "#121212")
    document.documentElement.style.setProperty("--log", "#4A4A4A")
    this.icono = "claro"
  }else{
    document.documentElement.style.setProperty("--fondo1", "#5dbad9")  
    document.documentElement.style.setProperty("--log", "#D97C5D")
    this.icono = "oscuro"
  }
}
}
