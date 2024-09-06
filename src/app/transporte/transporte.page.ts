import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
@Component({
  selector: 'app-transporte',
  templateUrl: './transporte.page.html',
  styleUrls: ['./transporte.page.scss'],
})
export class TransportePage implements OnInit {
  icono = 'Dark';
  constructor(private router: Router, public funciones : FuncionesCompartidasService) { }
  ngOnInit() {
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
