import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private oauthService: OAuthService) {

    const authCodeFlowConfig: AuthConfig = {
      issuer: 'https://fca.integ01.dev-agentconnect.fr/api/v2',
      redirectUri: window.location.origin + '/upload',
      clientId: 'e9a6f46f-384e-45cd-af53-ea7638d7c2a8',
      responseType: 'code',
      oidc: true,
      scope: 'openid profile email offline_access api',
      strictDiscoveryDocumentValidation: false,
      showDebugInformation: true,
      disablePKCE: true,
    };

    this.oauthService.configure(authCodeFlowConfig);
    // this.oauthService.tryLoginCodeFlow().then(x => {
    //   console.log(x);
    // });
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(x => {
      console.log(x);
    });
    // this.oauthService.configure();


  }


  login() {
    console.log("login");
    //this.oauthService.initImplicitFlow(null, { acr_values: 'eidas1' });
    this.oauthService.initCodeFlow(null, { acr_values: 'eidas1' });
  }
}
