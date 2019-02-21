import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { UserDataService } from '../../services/user-data.service';
import { UserProfile } from '../../models/user-profile';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.page.html',
  styleUrls: ['./user-address.page.scss'],
})
export class UserAddressPage implements OnInit, OnDestroy {

  public userProfileSubs$: Subscription;
  public userProfile: UserProfile;

  constructor(
    private router: Router ,
    private userDataServices: UserDataService
  ) {
    this.userProfile = {
      email: '',
      id: '',
      first_name: '',
      last_name: '',
      gender: null
    };
  }

  ngOnInit() {
    this.userProfileSubs$ = this.userDataServices.getUserProfile().subscribe( userProf => {
      this.userProfile = userProf;
    });
  }

  ngOnDestroy() {
    this.userProfileSubs$.unsubscribe();
  }

  addAddress(){
    this.router.navigateByUrl(`/user-address/add-address/${this.userProfile.id}`);
  }

}
