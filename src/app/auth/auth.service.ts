import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      console.log(fbUser);
    });
  }

  createUser(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user = { name, email, uid: resp.user.uid };

        this.afDB
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
          });
      })
      .catch(error => {
        console.error(error);
        Swal.fire('Authentication error', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        Swal.fire('Authentication error', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.afAuth.authState.pipe(map(fbUser => fbUser != null));
  }
}
