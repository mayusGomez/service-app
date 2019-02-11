import { Component, OnInit } from '@angular/core';

import cities from '../../../assets/data/citi.json';
import { Citi } from '../../models/country';

@Component({
  selector: 'citi-list',
  templateUrl: './citi-list.html',
  styleUrls: [],
})
export class CitiList implements OnInit {

  citiesList: Citi[] = cities;

  constructor() { 
      for (let citi of this.citiesList){
        console.log('Cities:' + citi.name  );
      }
   }

  ngOnInit() {
  }

}
