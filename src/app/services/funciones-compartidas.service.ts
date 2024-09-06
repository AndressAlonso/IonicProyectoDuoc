import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionesCompartidasService {
  public icono = 'Dark'; 
  constructor() { }

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
    } else if (this.icono == "Light") {
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
  getIcono() {
    return this.icono;
  }
}
