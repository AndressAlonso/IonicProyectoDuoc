import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';

@Component({
  selector: 'app-r-contrasena',
  templateUrl: './r-contrasena.page.html',
  styleUrls: ['./r-contrasena.page.scss'],
})
export class RContrasenaPage implements OnInit {
  User: string = '';
  clave: string = '';
  public usuarios: any[] = [{usuario:'admin', contraseña:'admin'}]

  constructor(public funciones: FuncionesCompartidasService) {
    if (localStorage.getItem('usuarios')) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!);
    }
  }

  ngOnInit() {
  }

  cambiarTema() {
    this.funciones.cambiarTema();
  }

  obtenerIcono() {
    return this.funciones.getIcono();
  }

  showToast(texto: string) {
    this.funciones.showToast(texto);
  }

  CrearUsuario(User: string, clave: string) {
    this.usuarios.forEach(user => {
      if (user.usuario === this.User) {
        this.showToast('Ese nombre de usuario ya esta en uso!.')
      } else {
        if (User === '' || clave === '' || User.length <= 6 || clave.length <= 6) {
          this.showToast('Los campos deben tener mas de 6 caracteres y no deben estar en blanco!.')
        } else {
          this.Registro({ usuario: User, contraseña: clave });
          this.showToast('Te has Registrado!.')
        }
      }
    });
  }

  Registro(usuario: any) {
    this.usuarios.push(usuario)
    console.log(usuario)
    console.log(this.usuarios)
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
  }
}

