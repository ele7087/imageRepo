import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './uploader/uploader.component';
import { ImagesComponent } from './images/images.component';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { ExploreComponent } from './explore/explore.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'uploader', component: UploaderComponent, canActivate: [AngularFireAuthGuard] }, //Does not let user access uploader page unless they are logged in
  { path: 'uploads', component: ImagesComponent, canActivate: [AngularFireAuthGuard] }, // Where private uploaded images are displayed
  { path: 'explore', component: ExploreComponent, canActivate: [AngularFireAuthGuard] }, // Where publicly uploaded images are displayed
  { path: '**', redirectTo: 'login'} // Redirect all other paths to login component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
