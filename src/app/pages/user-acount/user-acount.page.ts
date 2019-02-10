import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserDataService } from '../../services/user-data.service';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile';


@Component({
  selector: 'app-user-acount',
  templateUrl: './user-acount.page.html',
  styleUrls: ['./user-acount.page.scss'],
})
export class UserAcountPage implements OnInit, OnDestroy {

  public userProfileSubs: Subscription;
  public userProfileObject: UserProfile;
  public userProfileForm: FormGroup;

  constructor(
    public userService: UserDataService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.userProfileObject = {
      email: '',
      id: '',
      name: ''
    }

    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.userProfileSubs = this.userService.getUserProfile().subscribe( userProf =>{
      this.userProfileObject = userProf;
    });
  }

  ngOnDestroy(){
    this.userProfileSubs.unsubscribe();
  }

  saveUserProfile(userProfileForm: any){

  }



}
