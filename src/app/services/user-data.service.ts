import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user-profile';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    public authServ: AuthService,
    public db: AngularFirestore
  ) {  }

  getUserProfile(key: string =this.authServ.userUid): Observable<UserProfile>{
      return this.db.doc<UserProfile>(`userProfile/${key}`)  
        .valueChanges();
  }

}
