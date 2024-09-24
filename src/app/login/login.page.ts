import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,AfterViewInit {
  usuario = "";
  clave = "";
 usuarios: any[] = []
//Animacion del logo de la app
  ngOnInit() {
    this.anim.create()
    .addElement(document.querySelector("#img")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("transform", "rotate(-5deg)", "rotate(5deg)")
    .play()


    this.anim.create()
    .addElement(document.querySelector("#tema")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("transform", "rotate(-15deg)", "rotate(15deg)")
    .play()
}

  constructor(private anim: AnimationController, private router: Router, public funciones: FuncionesCompartidasService) { 
   
  }
  ionViewDidEnter() {
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }
  }
  navegar(page: string) {
    this.router.navigate([page]);
  }
  ngAfterViewInit() {
  }
  showToast(texto:string){
    this.funciones.showToast(texto);
  }
//Inicio de sesion
  login() {
    this.usuarios.forEach(user => {
      if (user.usuario === this.usuario && user.contraseña === this.clave){
        this.showToast('Se ha iniciado Sesion Correctamente')
        this.navegar('home')
      }else{
        this.showToast('El usuario no se encuentra registrado')
        console.log(this.usuarios)
      }
      
    });
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
  this.funciones.cambiarTema();
 }
 obtenerIcono(){ 
   return this.funciones.getIcono(); }    

}
