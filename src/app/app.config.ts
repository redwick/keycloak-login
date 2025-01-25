import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideKeycloak, withAutoRefreshToken, AutoRefreshTokenService, UserActivityService } from 'keycloak-angular';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';

export const provideKeycloakAngular = () =>
  provideKeycloak({
    config: {
      url: 'https://sso.djarviss.ru',
      realm: 'ms',
      clientId: 'web'
    },
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: false,
      //silentCheckSsoRedirectUri: window.location.origin + '/sso.html'
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });

export const appConfig: ApplicationConfig = {



  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
