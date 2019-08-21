import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { StartLoadingAction, StopLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;

  private user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.userSubscription = this.afAuth.authState.subscribe(
      (fbUser: firebase.User) => {
        if (fbUser) {
          this.afDB
            .doc(`${fbUser.uid}/user`)
            .valueChanges()
            .subscribe((userObj: any) => {
              const { name, email, uid } = userObj;
              const user = new User(name, email, uid);
              this.store.dispatch(new SetUserAction({ user }));
              this.user = user;
            });
        } else {
          if (this.userSubscription) {
            this.userSubscription.unsubscribe();
            this.user = null;
          }
        }
      }
    );
  }

  createUser(name: string, email: string, password: string) {
    this.store.dispatch(new StartLoadingAction());

    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user = { name, email, uid: resp.user.uid };

        this.afDB
          .doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);

            this.store.dispatch(new StopLoadingAction());
          });
      })
      .catch(error => {
        this.store.dispatch(new StopLoadingAction());

        console.error(error);
        Swal.fire('Authentication error', error.message, 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new StartLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {
        this.store.dispatch(new StopLoadingAction());

        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(new StopLoadingAction());

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

  getUser(): User {
    return { ...this.user };
  }
}
