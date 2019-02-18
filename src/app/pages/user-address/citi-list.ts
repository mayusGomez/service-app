import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

import cities from '../../../assets/data/citi.json';
import { Citi } from '../../models/citi';

@Component({
  selector: 'citi-list',
  templateUrl: './citi-list.html',
  styleUrls: [],
})
export class CitiList implements OnInit {

  citiesList: Citi[] = cities;

  constructor(
    private router: Router,
    public navCtrl: NavController 
  ) { }

  ngOnInit() {
  }

  citySelected(city: any){
    console.log(city);
    //this.router.navigate( ['/user-address/add-address', { citi: citi }]);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        city: JSON.stringify(city),
          //refresh: refresh
      }
    };
    this.router.navigate( ['/user-address/add-address', navigationExtras]);
    //this.navCtrl.navigateForward(['/user-address/add-address'], navigationExtras);

  }

}
