import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '../helper/firebaseAuth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private firebaseAuth: FirebaseAuth) {}

  ngOnInit(): void {
  }

  tryLogin(email: any, password: any) {
    return this.firebaseAuth.canLogin(email, password);
  }

  trySignup(email: any, password: any) {
    return this.firebaseAuth.canRegister(email, password);
  }

}
