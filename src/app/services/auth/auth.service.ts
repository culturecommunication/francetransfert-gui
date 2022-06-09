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
      clientId: '5286efc0-e9d7-43bb-906a-15c6498321cd',
      responseType: 'code',
      oidc: true,
      scope: 'openid profile email offline_access api',
      strictDiscoveryDocumentValidation: false,
      showDebugInformation: true,
      disablePKCE: true,
      dummyClientSecret: '10ee3f7e23388f1febee141296d38a3845fe8e783fcabf05c31a0502b220e4c5',
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
