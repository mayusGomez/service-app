import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserDataService } from '../../services/user-data.service';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../../models/user-profile';
import { ResponseObject, Gender } from '../../models/generic';


@Component({
  selector: 'app-user-acount',
  templateUrl: './user-acount.page.html',
  styleUrls: ['./user-acount.page.scss'],
})
export class UserAcountPage implements OnInit, OnDestroy {

  public userProfileSubs: Subscription;
  public userProfile: UserProfile;
  public userProfileForm: FormGroup;
  readonly genderMale: number = Gender.male;
  readonly genderFemale: number = Gender.female;
  readonly genderOther: number = Gender.other;

  public email_verified: boolean;

  constructor(
    public userService: UserDataService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {
    this.userProfile = {
      email: '',
      id: '',
      first_name: '',
      last_name: '',
      gender: null
    }

    this.userProfileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name:['', Validators.required],
      gender: ['', Validators.required],
      email: [{value: '', disabled: true}, Validators.compose([Validators.required, Validators.email])]
    });

    this.email_verified = this.authService.emailIsVerified();
    
  }

  ngOnInit() {
    this.userProfileSubs = this.userService.getUserProfile().subscribe( userProf =>{
      this.userProfile = userProf;
    });
  }

  ngOnDestroy(){
    this.userProfileSubs.unsubscribe();
  }

  verifyEmail(){
    this.authService.sendEmailVerification();
  }

  async updateUserProfile(){

    const updateUserProfResp: ResponseObject = await this.userService.updateUserProfile(this.userProfile);
    if ( updateUserProfResp.errCode === 0 ){
      const toast = await this.toastController.create({
        message: 'Actualización ejecutada con exito',
        duration: 5000
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: updateUserProfResp.errMsg,
        duration: 5000
      });
      toast.present();
    }

  }



}
