import { Component } from '@angular/core';
import { FirebaseAuth } from '../helper/firebaseAuth';

@Component({
  selector: 'uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent  {

  isHovering: boolean = false;
  files: File[] = [];
  isPrivate: boolean = true;
  constructor(private firebaseAuth: FirebaseAuth) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // When image is dropped in box
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  // Logout
  logout() {
    this.firebaseAuth.SignOut();
  }

}