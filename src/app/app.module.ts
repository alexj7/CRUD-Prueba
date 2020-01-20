import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [FilterPipe],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
