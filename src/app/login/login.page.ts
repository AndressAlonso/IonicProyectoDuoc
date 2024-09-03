import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,AfterViewInit {

//Animacion del logo de la app
  ngOnInit() {
    this.anim.create()
    .addElement(document.querySelector("#img")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("transform", "rotate(-5deg)", "rotate(5deg)")
    .play()

//Animacion del logo modo oscuro
    this.anim.create()
    .addElement(document.querySelector("#tema")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("transform", "rotate(-15deg)", "rotate(15deg)")
    .play()
}


  usuario = "";
  clave = "";
  icono = "Light";

  constructor(private anim: AnimationController, private router: Router) { }
  navegar(page: string) {
    this.router.navigate([page]);
  }
  ngAfterViewInit() {
    this.cambiarTema()
  }
//Inicio de sesion
  login() {
    
    if (this.usuario == 'admin' && this.clave == 'admin') { // Utiliza comparaciones (=== o ==)
      console.log("Ingresaste correctamente");
      this.router.navigate(['/home']); // Redirige a la página 'home'
    } else {
      this.animaInput("#clave");
      //this.animaInput("#usuario");
    }
  }
  
//Animacion de la contraseña
  animaInput(input: string) {
    let usuario = document.querySelector(input) as HTMLInputElement;
    //usuario.focus();
    this.anim.create().addElement(usuario)
      .duration(100).iterations(3)
      .keyframes([
        { offset: 0, transform: 'rotate(-3deg)' },
        { offset: 0.5, transform: 'rotate(3deg)' },
        { offset: 1, transform: 'rotate(0)' },
      ]).play();
  }

  //Funcion para cambiar a modo oscuro:
  cambiarTema() {
    if (this.icono == "Dark") {
      document.documentElement.style.setProperty("--fondo1", "#000000")
      document.documentElement.style.setProperty("--log", "#ffffff")
      var a = document.querySelectorAll('#inputV');
      console.log(a)
      a.forEach(inp => {
        inp?.setAttribute('aria-label', 'Dark input');
        inp?.setAttribute('color', 'light');
      });
      this.icono = "Light"
    } else {
      document.documentElement.style.setProperty("--fondo1", "#ffffff")
      document.documentElement.style.setProperty("--log", "#000000")
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
