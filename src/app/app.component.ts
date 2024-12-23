import {Component, effect, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kc';

  constructor(public kc: Keycloak) {

  }
  login() {
    this.kc.login().then(res => {

    });
  }
  load() {
    this.kc.loadUserProfile().then(profile => {
      alert(JSON.stringify(profile));
    });
  }


  logout() {
    this.kc.logout();
  }
}
