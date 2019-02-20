import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { Address } from '../../models/generic';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

declare var google: any;
enum ViewOptionEnum {
    city_list= 0,
    address= 1,
    map= 2
}

@Component({
  selector: 'add-address',
  templateUrl: './add-address.html',
  styleUrls: [],
})
export class AddAddress implements OnInit {

    @ViewChild('mapCanvas') mapElement: ElementRef;
    public addressForm: FormGroup;

    citiesList: Observable<City[]>;
    countryId = 'GT';
    citySelected: City;

    viewOption: ViewOptionEnum;
    showCityList: boolean;
    showAdress: boolean;
    showMap: boolean;
    showAddressDetailField: boolean;

    mapMarker: any;

    placesService: any;
    search_value: string;
    last_search_value: string;
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    address: Address;
    map: any;

    constructor(
        private router: Router ,
        public zone: NgZone,
        public cityService: CityService,
        public formBuilder: FormBuilder,
        public alertController: AlertController
    ) {
        this.showCityList = true;
        this.showAdress = false;
        this.showMap = false;

        this.showAddressDetailField = false;

        this.addressForm = this.formBuilder.group({
            address: ['', Validators.required],
            detail: ['', Validators.required]
        });
    }

    toggleView(option: ViewOptionEnum) {
        switch (option) {
            case ViewOptionEnum.address: {
                this.showCityList = false;
                this.showAdress = true;
                this.showMap = false;
                break;
            }
            case ViewOptionEnum.map: {
                this.showCityList = false;
                this.showAdress = false;
                this.showMap = true;
                break;
            }
            default: {
                this.showCityList = true;
                this.showAdress = false;
                this.showMap = false;
                break;
            }
        }
    }

    ngOnInit() {
        this.citiesList = this.cityService.getCities(this.countryId);
    }

    setCity(city: City) {
        this.citySelected = city;
        this.toggleView( ViewOptionEnum.address );
        this.address = {
            citi_id: this.citySelected.id,
            citi_name: this.citySelected.name,
            country_id: this.citySelected.country_id,
            country_name: this.citySelected.country_name,
            subdivision_id: this.citySelected.subdivision_id,
            subdivision_name: this.citySelected.subdivision_name,
            geolocation: {
                lat: null,
                lng: null
            }
        };
        this.loadMap();
    }

    loadMap() {
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            center: new google.maps.LatLng( this.citySelected.center_point.lat , this.citySelected.center_point.lng),
            zoom: 12,
            mapTypeControlOptions: {
                mapTypeIds: ['coordinate'],
            },
            streetViewControl: false,
        });
        this.placesService = new google.maps.places.PlacesService(this.map);
    }

    selectPlace(place: any) {
        this.places = [];
        this.search_value = place.formatted_address;
        this.last_search_value = this.search_value;
        this.showAddressDetailField = true;

        this.map.setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()});

        this.address.geolocation['lat'] = place.geometry.location.lat();
        this.address.geolocation['lng'] = place.geometry.location.lng();

        this.map.setZoom(15);
        this.mapMarker = new google.maps.Marker({
            position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
            animation: google.maps.Animation.DROP,
            draggable: true,
            map: this.map
        });

        this.map.addListener('click', (event) => {
            this.mapMarker.setMap(null);
            this.mapMarker = new google.maps.Marker({
                position: event.latLng,
                map: this.map,
                animation: google.maps.Animation.DROP,
                draggable: true
            });
            // console.log('event click');
            this.address.geolocation.lat = event.latLng.lat;
            this.address.geolocation.lng = event.latLng.lng;
        });
        // this.map.addListener('touchstart', (event) => {
        //     this.mapMarker.setMap(null);
        //     this.mapMarker = new google.maps.Marker({
        //         position: event.latLng,
        //         map: this.map,
        //         animation: google.maps.Animation.DROP,
        //         draggable: true
        //     });
        //     // console.log('event touchstart');
        //     this.address.geolocation.lat = event.latLng.lat;
        //     this.address.geolocation.lng = event.latLng.lng;
        // });
    }

    searchPlace () {
        console.log('searchPlace');
        if (this.last_search_value === this.search_value) {
            this.places = [];
            return;
        }

        this.showAddressDetailField = false;

        if (this.search_value && this.search_value.length > 0 ) {
            const request = {
                query: `${this.search_value} ,${this.citySelected.name}, ${this.citySelected.subdivision_name}`,
                fields: ['name', 'geometry', 'formatted_address'],
            };
            this.last_search_value = this.search_value;
            this.placesService.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.zone.run(() => {
                        this.places = results;
                    });
                } else {
                    console.log('Places No OK');
                }
            });
        } else {
            this.places = [];
        }
    }

    setAddress() {
        this.address.description = this.search_value;
        this.toggleView(ViewOptionEnum.map);
        // console.log(this.mapMarker);
        // console.log(`Direccion: ${ JSON.stringify(this.address)}`);
        this.presentAlert();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Atención',
            subHeader: 'Definir posición Geográfica',
            message: 'Por favor confirme la posición geográfica de la dirección ingresada',
            buttons: ['OK']
        });
        await alert.present();
    }

}
