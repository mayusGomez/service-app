import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Address } from '../../models/generic';

declare var google: any;

@Component({
  selector: 'add-address',
  templateUrl: './add-address.html',
  styleUrls: [],
})
export class AddAddress implements OnInit {

    @ViewChild('mapCanvas') mapElement: ElementRef;

    placesService: any;
    search_value:string;
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    address: Address;
    map: any;

    constructor(
        private router: Router ,
        public activatedRoute: ActivatedRoute,
        public zone: NgZone
    ) { 
        this.address = {
            country_id: 'CO',
            country_name: 'Colombia',
            subdivision_id: 'xxx',
            subdivision_name: 'xxxx',
            citi_id: 'xxxx',
            citi_name: 'yyy'
        }
        let x = activatedRoute.snapshot.params;

        activatedRoute.queryParams.subscribe(params => {
            //this.currency = JSON.parse(params["currency"]);
            console.log(`citi: ${params["city"]}`)
        });

        console.log('params:'+  JSON.stringify(x.citi)  );
    }

    ngOnInit() {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: new google.maps.LatLng(3.4353942, -76.5270954),
            zoom: 12,
            mapTypeControlOptions: {
                mapTypeIds: ['coordinate'],
            },
            streetViewControl: false,
        });

        //this.autocompleteService = new google.maps.places.AutocompleteService();
        this.placesService = new google.maps.places.PlacesService(this.map);
    }

    selectPlace(place: any){

        this.places = [];
        this.search_value = place.formatted_address;

        console.log('place:' + JSON.stringify(place));

        this.map.setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}); 


        /*this.placesService.getDetails({placeId: place.place_id}, (details) => {

            this.zone.run(() => {

                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                this.saveDisabled = false;

                this.map.setCenter({lat: location.lat, lng: location.lng}); 

                //this.location = location;

            });

        });*/

    }

    searchByKeyword(x: any){
        console.log('searchByKeyword:'+ x);
        this.places = [];
    }

    searchPlace (){
        console.log('searchPlace...');
        

        if(this.search_value.length > 0 ) {
            let request = {
                query: `${this.search_value}, Cali`,
                fields: ['name', 'geometry','formatted_address'],
            };
            console.log('service');
            console.log(`this.search_value: ${this.search_value}`);

            console.log('find place');
            this.placesService.findPlaceFromQuery(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {

                this.zone.run(() => {
                    this.places = results;
                    console.log('results');
                });
                
            }
            else{
                console.log('Places No OK');
            }
            });

        } else{
            this.places = [];
        }

    }

    searchPlaceOld(){

        /*console.log('searchPlace:');
        this.saveDisabled = true;

        if(this.search_value.length > 0 //&& !this.searchDisabled
            ) {

            const bounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(3.505554, -76.46082489999999),
                new google.maps.LatLng(3.2845748, -76.590503));

            let config = {
                //types: ['geocode'],
                input: this.search_value,
                componentRestrictions: { country: 'co'},
                //bounds: bounds
            }

            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {

                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){

                    this.places = [];

                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }

            });

        } else {
            this.places = [];
        }

        console.log('places:' + this.places);*/

    }

}
