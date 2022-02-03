import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
//
import { AppComponent } from './app.component';
//
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
//
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    LandingPageComponent,
    CataloguePageComponent,
    TrainerPageComponent,
    LoginPageComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // CLI adds AppRoutingModule to the AppModule's
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
