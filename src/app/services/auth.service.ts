import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import * as firebase from 'firebase/app';
import { UserProfile } from '../models/user-profile';
import { ResponseObject } from '../models/generic';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userUid: string;
  public email_verified: boolean=false;

  constructor(
      public afAuth: AngularFireAuth,
      public fireStore: AngularFirestore
  ) {
    this.afAuth.authState.subscribe( user =>{
      if (user) { 
          console.log(`constructor auth service Id auth: ${user.uid}`);
          this.userUid = user.uid;
          this.email_verified = user.emailVerified;
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

  async sendEmailVerification() {
    let user:any = firebase.auth().currentUser;
    return await user.sendEmailVerification().then(
      (success) => { return { 'errCode': 0, 'msg': 'Verification sended'} } 
    ).catch(
      (err) => {
        return { 'errCode': 1, 'msg': err };
      }
    );
  }

  emailIsVerified(){
    return this.email_verified;
  }

  async createUser(userProfile: UserProfile, password: string): Promise<ResponseObject> {
    
    let resp : ResponseObject = {
      object: null,
      errCode: 0,
      errMsg: ''
    };

    try{
      console.log('Inicia');
      const userCredential: firebase.auth.UserCredential = await this.afAuth.auth.createUserWithEmailAndPassword(
        userProfile.email,
        password
      );
      console.log('sgte');

      userProfile.id = userCredential.user.uid;
      console.log('a');
      
      const userProfileDoc: AngularFirestoreDocument<UserProfile> = this.fireStore.doc(`userProfile/${userCredential.user.uid}`);
      await userProfileDoc.set({
        ...userProfile
      });

      resp['userCredential'] = userCredential.user;

      return resp;

    }catch (err){
      console.log('error al crear cuenta');
      console.log(err);
      if (err.code === "auth/email-already-in-use"){
        resp['errCode'] = 1;
        resp['errMsg'] = 'El usuario ya posee una cuenta en el sistema';
      } else {
        resp['errCode'] =-1;
        resp['errMsg'] = err.message;
      }
      
      return resp;
      
      // TODO: Registrar error
    }
  }
}