import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
  icono = "oscuro";

  constructor(private anim: AnimationController, private router: Router) { }
  navegar(page: string) {
    this.router.navigate([page]);
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
  cambiarTema(){
    if (this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo1", "#121212")
      document.documentElement.style.setProperty("--log", "#4A4A4A")
      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo1", "#5dbad9")
      document.documentElement.style.setProperty("--log", "#D97C5D")
      
      this.icono = "oscuro"
    }
  }


}
