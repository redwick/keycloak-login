import {Component, effect, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Keycloak from 'keycloak-js';
import {KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs} from 'keycloak-angular';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs';
export class UploadUrl {
  path: string = '';
  url: string = '';
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kc';
  user: any;
  authenticated: boolean = false;

  constructor(public kc: Keycloak, public http: HttpClient) {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
        this.load();
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }
  login() {
    this.kc.login().then(res => {
      console.log(res);
    });
  }
  load() {
    this.kc.loadUserProfile().then(profile => {
      this.user = profile;
      console.log(this.user);
    });
  }


  logout() {
    this.kc.logout();
  }

  handleFileInputCloudUpload(files: FileList | null) {
    let file = files?.item(0);
    if (file){
      console.log(file);
      const headers = { 'Authorization': 'Bearer' + this.kc.token };
      this.http
        .get<UploadUrl>( 'https://djarviss.ru/rest/uploadUrl', {
          params: { fileName: file.name },
          headers
        })
        .subscribe((uploadUrl) => {
          console.log('url received', uploadUrl);
          this.http.put(uploadUrl.url, file,  { responseType: 'text', reportProgress: true, observe: 'events' }).pipe(
            map((event: any) => {
              console.log(event);
            })
          ).subscribe(() => {
            console.log('file uploaded');
          });
        });
    }
  }
}
