import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user-profile';
import { ResponseObject } from '../models/generic';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    public authServ: AuthService,
    public db: AngularFirestore
  ) {  }

  getUserProfile(key: string =this.authServ.userUid): Observable<UserProfile>{
    return this.db.doc<UserProfile>(`userProfile/${key}`).valueChanges();
  }

  async updateUserProfile(userProfile: UserProfile ): Promise<ResponseObject>{
    let response: ResponseObject ={
      object: null,
      errCode: 0,
      errMsg: ''
    };

    try{
      await this.db.doc(`userProfile/${userProfile.id}`).set({...userProfile});
      return response;
    } catch(err){
      response['errCode'] = -1;
      response['errMsg'] = 'Error en la actualización de los datos';
      return response;
    }
  }

}
