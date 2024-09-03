import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  icono = "oscuro";

  constructor(private router: Router) {}
  navegar(page: string): void {
    this.router.navigate([`/${page}`]);
  }
  
  //Funcion para cambiar a modo oscuro:
  cambiarTema(){
    if (this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo1", "#121212")
      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo1", "#5dbad9")
      this.icono = "oscuro"
    }
  }

}
