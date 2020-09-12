import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FunctionsPageComponent } from './functions-page/functions-page.component';
import { RxjsFunctionsStore } from './Model/RxjsFuntionsStore';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FunctionsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [RxjsFunctionsStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
