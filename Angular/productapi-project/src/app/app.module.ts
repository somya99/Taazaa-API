import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AsyncComponent } from './async/async.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ​​​​​​​​MatIconModule }​​​​​​​​ from'@angular/material/icon';
import {​​​​ ​​​​MatToolbarModule }​​​​​​​​ from'@angular/material/toolbar';
import {​​​ ​​​​​MatButtonModule }​​​​​​​​ from'@angular/material/button';
import {​​ ​​​​​​MatSidenavModule }​​​​​​​​ from'@angular/material/sidenav';
import {​ ​​​​​​​MatListModule }​​​​​​​​ from'@angular/material/list';
import { FindComponent } from './find/find.component';
import { MaterialComponent } from './material/material.component';
import { MatTableModule } from '@angular/material/table';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubscribeComponent,
    AsyncComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    FindComponent,
    MaterialComponent,
    DetailComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
