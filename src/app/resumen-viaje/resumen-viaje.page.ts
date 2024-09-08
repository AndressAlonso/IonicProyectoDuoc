import { Component, OnInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumen-viaje',
  templateUrl: './resumen-viaje.page.html',
  styleUrls: ['./resumen-viaje.page.scss'],
})
export class ResumenViajePage implements OnInit {
  isModalOpen = false;
  constructor(public funciones: FuncionesCompartidasService, private router: Router) { }

  ngOnInit() {
  }
  navegar(ruta: string) {
    this.router.navigate( [ruta]);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  cambiarTema() {
    this.funciones.cambiarTema();
  }  
  obtenerIcono() {
    return this.funciones.getIcono();
  }
  
}
