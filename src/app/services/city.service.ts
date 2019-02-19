import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import cities from '../../assets/data/city.json';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  getCities(country: string): Observable<City[]>{
    return of( cities.filter(city => city.country_id === country) );
  }

}
