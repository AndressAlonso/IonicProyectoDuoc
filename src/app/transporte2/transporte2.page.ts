import { Component, OnInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
@Component({
  selector: 'app-transporte2',
  templateUrl: './transporte2.page.html',
  styleUrls: ['./transporte2.page.scss'],
})
export class Transporte2Page implements OnInit {

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
