import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  icono = "oscuro";
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

  constructor(private anim: AnimationController,private router: Router) {}
  navegar(page: string): void {
    this.router.navigate([`/${page}`]);
  }
  
  //Funcion para cambiar a modo oscuro:
  cambiarTema() {
    if (this.icono == "Dark") {
      document.documentElement.style.setProperty("--fondo1", "#000000")
      document.documentElement.style.setProperty("--log", "#ffffff")
      document.documentElement.style.setProperty("--border", "#ccc")
      var a = document.querySelectorAll('#inputV');
      console.log(a)
      a.forEach(inp => {
        inp?.setAttribute('aria-label', 'Dark input');
        inp?.setAttribute('color', 'light');
      });
      this.icono = "Light"
    } else {
      document.documentElement.style.setProperty("--fondo1", "#cdcccc")
      document.documentElement.style.setProperty("--log", "#000000")
      document.documentElement.style.setProperty("--border", "#000000")
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
