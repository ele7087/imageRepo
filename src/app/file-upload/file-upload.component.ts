import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage'
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseAuth } from '../helper/firebaseAuth';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() file!: File;
  @Input() isPrivate!: boolean;

  // Main task
  task!: AngularFireUploadTask;

  // Uploading progress
  percentage!: Observable<number | undefined>;

  snapshot!: Observable<any>;

  downloadURL!: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private auth: FirebaseAuth) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

    let storageName = 'publicImages'
    let path = `${storageName}/${this.file.name}`

    if(this.isPrivate) {
      storageName = 'privateImages'
      path = `${storageName}/${this.auth.getCurrentUserId()}/${this.file.name}`
    }



    const ref = this.storage.ref(path);

    // Main task
    this.task = this.storage.upload(path, this.file)

    // Upload progress
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async() => {
        //Image download URL
        this.downloadURL = await ref.getDownloadURL().toPromise();
        //Upload picture downloadURL to private image collection
        if(this.isPrivate) {
          this.db.collection(`${this.auth.getCurrentUserId()}`).add( { downloadURL: this.downloadURL, path});
          return;
        }
        //Upload picture downloadURL to public image coollection
        this.db.collection(`${storageName}`).add( { downloadURL: this.downloadURL, path});
      })
    );
  }
  // Check if uploading
  isActive(snapshot: any) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
