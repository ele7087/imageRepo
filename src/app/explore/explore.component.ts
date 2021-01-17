import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseAuth } from '../helper/firebaseAuth';

export interface Images { downloadURL: string; path: string; }

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent {

  private imagesCollection: AngularFirestoreCollection<Images>;
  images: Observable<Images[]>;
  constructor(private db: AngularFirestore, private auth: FirebaseAuth) {
    this.imagesCollection = this.db.collection<Images>("publicImages");
    this.images = this.imagesCollection.valueChanges();
   }

  // Logout
  logout() {
    this.auth.SignOut();
  }

}
