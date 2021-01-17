import { Injectable} from '@angular/core';
import { AngularFireAuth, PERSISTENCE } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFireAuthModule } from '@angular/fire/auth'
import { ENABLE_PERSISTENCE, PERSISTENCE_SETTINGS } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root'})
export class FirebaseAuth {
  authState: any = null;
  constructor(private fireAuth: AngularFireAuth, private router: Router){
      this.fireAuth.authState.subscribe( authState => {
          this.authState = authState;
      });
  }
  
  // Registration authentication
    canRegister(email: string, password: string) {
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                window.alert('You have signed up successfully!');
                console.log(res.user)
    })
            .catch(error => {
                window.alert(error.message);
    });
}

// Login authentication
canLogin(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(res => {
        this.router.navigateByUrl('/uploader');
    })
    .catch(error => {
        window.alert(error.message);
    });
}

getCurrentUserId() {
    return this.authState !== null ? this.authState.uid : null;
}

//Logout
SignOut() {
    return this.fireAuth.signOut()
    .then(res => {
        this.router.navigateByUrl('/login');
    });
}

}