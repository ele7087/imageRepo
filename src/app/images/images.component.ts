import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseAuth } from '../helper/firebaseAuth';
import { Observable } from 'rxjs';

export interface Images { downloadURL: string; path: string; }

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {
  private imagesCollection: AngularFirestoreCollection<Images>;
  images: Observable<Images[]>;
  constructor(private db: AngularFirestore, private auth: FirebaseAuth) {
    this.imagesCollection = this.db.collection<Images>(`${this.auth.getCurrentUserId()}`);
    this.images = this.imagesCollection.valueChanges();
   }

     // Logout
  logout() {
    this.auth.SignOut();
  }

}
