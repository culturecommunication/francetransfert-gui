import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { DataMockService } from './mocks/data-mock.service';
// import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // ****** Service de mock : a n'utiliser qu'en DEV                                                      ****** 
    HttpClientInMemoryWebApiModule.forRoot(DataMockService),
    // ****** Remplacer la ligne précédente par celle-ci pour activer le service de mock uniquement en DEV  ****** 
    // ****** Décommenter l'import de 'environment'                                                         ****** 
    // environment.production ? [] : HttpClientInMemoryWebApiModule.forRoot(DataMockService),
    
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
