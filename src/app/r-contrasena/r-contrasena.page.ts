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
  email = '';
  public usuarios: any[] = [{ usuario: 'admin', contraseña: 'admin' }]

  constructor(public funciones: FuncionesCompartidasService) {
    if (localStorage.getItem('usuarios')) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!);
    }
  }

  ngOnDestroy() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
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

  CrearUsuario(User: string, clave: string, email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (User === '' || clave === '' || User.length <= 6 || clave.length <= 6) {
      this.showToast('Los campos deben tener más de 6 caracteres y no deben estar en blanco!');
    }
    else if (!emailRegex.test(email)) { this.showToast('El formato del correo electrónico no es válido!'); } else { const usuarioExistente = this.usuarios.find(user => user.usuario === User); if (usuarioExistente) { this.showToast('Ese nombre de usuario ya está en uso!'); } else { this.Registro({ usuario: User, contraseña: clave, logIn: false, email: email, viajes: [] }); this.showToast('Te has registrado exitosamente!'); this.funciones.navegar('login'); } }
  }

  Registro(usuario: any) {
    this.usuarios.push(usuario)
    console.log(this.usuarios)
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios))
  }
}

