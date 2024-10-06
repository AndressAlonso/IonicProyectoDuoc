import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FuncionesCompartidasService {
  usuarioLogeado: string = "Ninguno";
  public usuarios: any[] = []
  public icono = 'Dark';
  constructor(private toast: ToastController, public router: Router,private navCtrl: NavController ) {
  }
  handleBackButton() {
    this.navCtrl.navigateRoot('/home');
  }
  goBack() {
    this.navCtrl.back();
  }
  
  reloadPage() {
    location.reload();
  }
  navegar(page: string) {
    this.router.navigate([page]);
  }
  cambiarTema() {
    if (this.icono == "Light") {
      document.documentElement.style.setProperty("--fondo1", "#1F1F1F")
      document.documentElement.style.setProperty("--log", "#ffffff")
      document.documentElement.style.setProperty("--border", "#ccc")
      var a = document.querySelectorAll('#inputV');
      var b = document.querySelector('#boton');
      var btnclose = document.getElementById('closebtn');
      btnclose?.setAttribute('color', 'light');
      b?.setAttribute('color', 'light');
      console.log(a)
      var cards = document.querySelectorAll('#card');
      cards.forEach(card => {
        card?.setAttribute('color', 'light');
      });
      var header = document.querySelectorAll('ion-header');
      const botonesV = document.querySelectorAll('#botonT');
      botonesV.forEach(boton => {
        boton?.setAttribute('color', 'light');
      });
      a.forEach(inp => {
        inp?.setAttribute('aria-label', 'Dark input');
        inp?.setAttribute('color', 'light');
      });
      this.icono = "Dark"
    } else if (this.icono == "Dark") {
      document.documentElement.style.setProperty("--fondo1", "#ECECEC")
      document.documentElement.style.setProperty("--log", "#1F1F1F")
      document.documentElement.style.setProperty("--border", "#1F1F1F")
      var a = document.querySelectorAll('#inputV');
      var b = document.querySelector('#boton');
      var btnclose = document.getElementById('closebtn');
      console.log(btnclose)
      btnclose?.setAttribute('color', 'dark');
      b?.setAttribute('color', 'dark');
      var cards = document.querySelectorAll('#card');
      cards.forEach(card => {
        card?.setAttribute('color', 'dark');
      });
      const botonesV = document.querySelectorAll('#botonT');
      botonesV.forEach(boton => {
        boton?.setAttribute('color', 'dark');
      });
      console.log(a)
      a.forEach(inp => {
        inp?.setAttribute('aria-label', 'Dark input');
        inp?.setAttribute('color', 'dark');
      });
      this.icono = "Light"
    }


  }


  getIcono() {
    return this.icono;
  }

  async showToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 1500,
      positionAnchor: 'footer',
      cssClass: 'rounded-toast',
      position: 'bottom'
    });

    await toast.present();
  }



}
