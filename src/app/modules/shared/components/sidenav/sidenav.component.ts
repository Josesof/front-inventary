import { MediaMatcher } from '@angular/cdk/layout';
import { Component, Injectable, OnInit, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;
  userName: any;
  menuNav = [
    {name: 'Home', route: 'home', icon:'home'},
    {name: 'Categorias', route: 'category', icon:'category'},
    {name: 'Productos', route: 'product', icon:'production_quantity_limits'},
    {name: 'Compras', route: 'carrito', icon:'category'},
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }



  shouldRun = true;

  ngOnInit(): void {
  }

  logout() {
  }


}


