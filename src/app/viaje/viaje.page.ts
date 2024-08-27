import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
  }
  navegar(page:string){
    this.router.navigate([page]);
  }
}
