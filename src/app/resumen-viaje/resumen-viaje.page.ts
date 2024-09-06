import { Component, OnInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';

@Component({
  selector: 'app-resumen-viaje',
  templateUrl: './resumen-viaje.page.html',
  styleUrls: ['./resumen-viaje.page.scss'],
})
export class ResumenViajePage implements OnInit {
  constructor(public funciones: FuncionesCompartidasService) { }

  ngOnInit() {
  }


  cambiarTema() {
    this.funciones.cambiarTema();
  }  
  obtenerIcono() {
    return this.funciones.getIcono();
  }
  
}
