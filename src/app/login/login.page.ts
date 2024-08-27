import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  ngOnInit() {
  }


  usuario = "";
  clave = "";

  constructor(private anim: AnimationController, private router: Router) { }
  navegar(page: string) {
    this.router.navigate([page]);
  }
  login() {
    if (this.usuario == 'admin' && this.clave == 'admin') { // Utiliza comparaciones (=== o ==)
      console.log("Ingresaste correctamente");
      this.router.navigate(['/home']); // Redirige a la página 'home'
    } else {
      this.animaInput("#clave");
    }
  }

  animaInput(input: string) {
    let usuario = document.querySelector(input) as HTMLInputElement;
    // usuario.focus();
    this.anim.create().addElement(usuario)
      .duration(100).iterations(3)
      .keyframes([
        { offset: 0, transform: 'rotate(-3deg)' },
        { offset: 0.5, transform: 'rotate(3deg)' },
        { offset: 1, transform: 'rotate(0)' },
      ]).play();
  }
}
