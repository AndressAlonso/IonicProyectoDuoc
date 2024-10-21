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
  usuarios: any[] = [];
  icono = "Dark";
  isModalOpen = false;
  usuarioInfo = {
    "email": '',
  }
  usuarioViajes:any[] = []
  ngOnInit() {
    //Animacion del logo modo oscuro
    this.anim.create()
    .addElement(document.querySelector("#tema")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("transform", "rotate(-15deg)", "rotate(15deg)")
    .play()
    this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
}

  constructor(private anim: AnimationController,private router: Router, public funciones : FuncionesCompartidasService) {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ionViewDidEnter() {
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }
    this.usuarios.forEach(usuario => {
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      }
    });
    this.getInformacionUsuario()
    console.log(this.funciones.usuarioLogeado)
    
  }

  navegar(page: string): void {
    this.router.navigate([page]);
  }

  getInformacionUsuario(){
    if (localStorage.getItem("usuarios")){
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!)
    }
    this.usuarios.forEach(user => {
      if (user.usuario === this.funciones.usuarioLogeado){
        this.usuarioInfo.email = user.email
        console.log(user.viajes)
        this.usuarioViajes = user.viajes
      }
    })
  }
  logout(){
    this.usuarios.forEach(user => {
      if (user.logIn == true) {
        user.logIn = false;
        this.funciones.usuarioLogeado = "Ninguno";
      }
    });
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
    this.navegar('login');
  }
  cambiarTema() {
    this.funciones.cambiarTema();
  }
  obtenerIcono() {
    return this.funciones.getIcono();
  }
    
}
