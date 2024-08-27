import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacion-viaje',
  templateUrl: './confirmacion-viaje.page.html',
  styleUrls: ['./confirmacion-viaje.page.scss'],
})
export class ConfirmacionViajePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
navegar(page:string){
  this.router.navigate([page]);
}
}
