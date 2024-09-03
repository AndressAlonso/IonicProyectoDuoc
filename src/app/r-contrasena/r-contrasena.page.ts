import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-r-contrasena',
  templateUrl: './r-contrasena.page.html',
  styleUrls: ['./r-contrasena.page.scss'],
})
export class RContrasenaPage implements OnInit {
  
  icono = "Dark";

  constructor() { }

  ngOnInit() {
    this.cambiarTema()
  }

  
//Funcion para cambiar a modo oscuro:
cambiarTema() {
  if (this.icono == "Dark") {
    document.documentElement.style.setProperty("--fondo1", "#000000")
    document.documentElement.style.setProperty("--log", "#ffffff")
    var a = document.querySelectorAll('#inputV');
    console.log(a)
    a.forEach(inp => {
      inp?.setAttribute('aria-label', 'Dark input');
      inp?.setAttribute('color', 'light');
    });
    this.icono = "Light"
  } else {
    document.documentElement.style.setProperty("--fondo1", "#ffffff")
    document.documentElement.style.setProperty("--log", "#000000")
    var a = document.querySelectorAll('#inputV');
    console.log(a)
    a.forEach(inp => {
      inp?.setAttribute('aria-label', 'Dark input');
      inp?.setAttribute('color', 'dark');
    });
    this.icono = "Dark"
  }
}

}
