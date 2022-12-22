import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PrimeNgModule } from './auth/prime-ng/prime-ng.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent 
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    PrimeNgModule,
    HttpClientModule,
    FormsModule,
    NgFor 
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
