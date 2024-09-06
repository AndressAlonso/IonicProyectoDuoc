import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {
  constructor(private router: Router, public funciones: FuncionesCompartidasService) { }
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
