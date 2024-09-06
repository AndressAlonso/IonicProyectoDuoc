import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';

@Component({
  selector: 'app-r-contrasena',
  templateUrl: './r-contrasena.page.html',
  styleUrls: ['./r-contrasena.page.scss'],
})
export class RContrasenaPage implements OnInit {
  

  constructor( public funciones:FuncionesCompartidasService) { }

  ngOnInit() {
  }

  
//Funcion para cambiar a modo oscuro:
cambiarTema(){
  this.funciones.cambiarTema();
}

obtenerIcono(){ 
  return this.funciones.getIcono(); }

}
