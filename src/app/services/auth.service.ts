import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { UserProfile } from '../models/user-profile';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userUid: string;

  constructor(
      public afAuth: AngularFireAuth,
      public fireStore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe( user =>{
      if (user) { 
          console.log(`constructor auth service Id auth: ${user.uid}`);
          this.userUid = user.uid;
      }
    });
  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  async createUser(email: string, password: string): Promise<firebase.User> {
    try{
      const userCredential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const userProfileDoc: AngularFirestoreDocument<UserProfile> = this.fireStore.doc(`userProfile/${userCredential.user.uid}`);
      await userProfileDoc.set({
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: email
      });

      return userCredential.user;

    }catch (err){
      console.log(err);
      // TODO: Registrar error
    }
  }
}