import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit, AfterViewInit {
  icono = 'Dark'
  constructor(private router: Router) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cambiarTema()
  }

  navegar(page: string) {
    this.router.navigate([page]);
  }

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
      document.documentElement.style.setProperty("--fondo1", "#cdcccc")
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
