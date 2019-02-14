import { Component, OnInit } from '@angular/core';

import cities from '../../../assets/data/citi.json';
import { Citi } from '../../models/citi';

@Component({
  selector: 'citi-list',
  templateUrl: './citi-list.html',
  styleUrls: [],
})
export class CitiList implements OnInit {

  citiesList: Citi[] = cities;

  constructor() { }

  ngOnInit() {
  }

  citiSelected(citi: any){
    console.log(citi);
  }

}
