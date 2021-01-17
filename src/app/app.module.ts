import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth'; 

import { environment } from '../environments/environment';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { UploaderComponent } from './uploader/uploader.component';
import { DragdropDirective } from './dragdrop.directive';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ImagesComponent } from './images/images.component';
import { ExploreComponent } from './explore/explore.component';

@NgModule({
  declarations: [
    AppComponent,
    DragdropDirective,
    FileUploadComponent,
    UploaderComponent,
    LoginComponent,
    ImagesComponent,
    ExploreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, //fires
    AngularFireStorageModule, // storage
    AngularFireAuthModule, // auth
    AngularFireAuthGuardModule // authGuard
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }