import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AnimationController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FuncionesCompartidasService } from '../services/funciones-compartidas.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email = ''
  usuario = "";
  clave = "";
  usuarios: any[] = [];
  //Animacion del logo de la app
  ngOnInit() {
    this.VerificarUsuarioConectado();
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

  constructor( private loadingCtrl: LoadingController,
    private http: HttpClient,private anim: AnimationController, private router: Router, public funciones: FuncionesCompartidasService) {
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!);
    }
  }

  async resetPass() {
    for (let u of this.usuarios) {
      if (u.email == this.email) {
        const loading = await this.loadingCtrl.create({
          message: 'Cargando...',
        });
        loading.present()
        let nueva = Math.random().toString(36).slice(-6)
        u.contraseña = nueva
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
        let body = {
          "nombre": u.nombre,
          "app": "TeLlevoApp",
          "clave": nueva,
          "email": u.email
        }
        this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data)=>{
          console.log(data)
          this.showToast('Se ha enviado un correo de recuperacion de contraseña')
          loading.dismiss()
        })
        return
      }
    }
    this.funciones.showToast('No hay Ningun Usuario asociado a ese Email')
    console.log("Usuario no existe!.")
  }
  ionViewWillEnter() {
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!);
    }
    this.VerificarUsuarioConectado();
  }
  VerificarUsuarioConectado() {
    const usuarioConectado = this.usuarios.find(usuario => {
      console.log(usuario)
      if (usuario.logIn == true) {
        this.funciones.usuarioLogeado = usuario.usuario;
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
        this.navegar('home');
      }
    });

  }
  ionViewDidEnter() {
    this.VerificarUsuarioConectado();
  }
  ionWillLeave() {
    if (localStorage.getItem("usuarios")) {
      this.usuarios = JSON.parse(localStorage.getItem("usuarios")!);
    }
  }

  navegar(page: string) {
    this.router.navigate([page]);
  }

  showToast(texto: string) {
    this.funciones.showToast(texto);
  }
  login() {
    this.usuarios.forEach(user => {
      console.log(user)
      if (this.usuario === '' || this.clave === '') {
        this.showToast('Los campos no pueden estar vacios');
      } else {
        if (user.usuario === this.usuario && user.contraseña !== this.clave) {
          this.showToast('Contraseña incorrecta');
        } else if (user.usuario === this.usuario && user.contraseña === this.clave) {
          user.logIn = true;
          localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
          this.showToast('Se ha iniciado Sesion Correctamente');
          this.navegar('home');
        } else {
          this.showToast('El usuario no se encuentra registrado');
          console.log(this.usuarios);
        }
      }
    });
  }


  //Animacion de la contraseña
  animaInput(input: string) {
    let usuario = document.querySelector(input) as HTMLInputElement;

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
    this.funciones.cambiarTema();
  }


  obtenerIcono() {
    return this.funciones.getIcono();
  }

}
