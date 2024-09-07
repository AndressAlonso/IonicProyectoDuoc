import { Component, OnInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';

@Component({
  selector: 'app-viaje2',
  templateUrl: './viaje2.page.html',
  styleUrls: ['./viaje2.page.scss'],
})
export class Viaje2Page implements OnInit {

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
