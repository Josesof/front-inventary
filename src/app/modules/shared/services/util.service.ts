import { Component, Injectable, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private keycloakService = inject(KeycloakService);

  constructor() { }
  ngOnInit(): void {
  }

  getRoles() {
    return this.keycloakService.getUserRoles();
  }

  isAdmin() {
    let roles = this.keycloakService.getUserRoles().filter(role => role == "admin")
    if (roles.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
