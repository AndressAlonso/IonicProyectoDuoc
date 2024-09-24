import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  icono = "Dark";
  ngOnInit() {
    //Animacion del logo modo oscuro
    this.anim.create()
    .addElement(document.querySelector("#tema")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("transform", "rotate(-15deg)", "rotate(15deg)")
    .play()
}

  constructor(private anim: AnimationController,private router: Router, public funciones : FuncionesCompartidasService) {}
  navegar(page: string): void {
    this.router.navigate([`/${page}`]);
  }
  
  cambiarTema() {
    this.funciones.cambiarTema();
  }
  obtenerIcono() {
    return this.funciones.getIcono();
  }

    
}
