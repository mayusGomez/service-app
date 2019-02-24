import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import * as firebase                      from 'firebase/app';

import { Address } from '../../models/generic';
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { UserDataService } from '../../services/user-data.service'

declare var google: any;
enum ViewOptionEnum {
    city_list= 0,
    address= 1,
    map= 2
}

@Component({
  selector: 'add-address',
  templateUrl: './add-address.html',
  styleUrls: ['add-address.scss'],
})
export class AddAddress implements OnInit {

    @ViewChild('mapCanvas') mapElement: ElementRef;
    public addressForm: FormGroup;
    userId: string;

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
        private router: Router,
        public zone: NgZone,
        public cityService: CityService,
        public formBuilder: FormBuilder,
        public alertController: AlertController,
        private loadingController: LoadingController,
        private userDataService: UserDataService,
        private toastController: ToastController
    ) {
        this.showCityList = true;
        this.showAdress = false;
        this.showMap = false;

        this.showAddressDetailField = false;

        this.addressForm = this.formBuilder.group({
            icon: ['', Validators.required],
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
            zoom: 10,
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
        this.map.setZoom(16);

        this.address.geolocation = new firebase.firestore.GeoPoint(
            Number(place.geometry.location.lat()),
            Number(place.geometry.location.lng())
        );

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
            if (this.mapMarker){
                this.mapMarker.setMap(null);
            }
            this.mapMarker = new google.maps.Marker({
                position: event.latLng,
                map: this.map,
                draggable: true
            });
            // console.log('event click');
            this.address.geolocation = new firebase.firestore.GeoPoint(
                Number(place.geometry.location.lat()),
                Number(place.geometry.location.lng())
            );
        });
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
        this.presentAlert();
        this.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
    }

    async exitWithoutSave(){
        const alert = await this.alertController.create({
            header: 'Salir sin guardar',
            message: 'Realmente <strong>NO quiere almacenar su dirección?</strong>!!!',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Si, no quiero',
                handler: () => {
                  console.log('Confirm Okay');
                  this.router.navigateByUrl('/user-address');
                }
              }
            ]
          });
      
          await alert.present();
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

    async saveAddres() {
        let toast: any;
        const loading = await this.loadingController.create({
          message: 'Adicionando direccion',
          duration: 10000
        });
        loading.present();

        try{
            await this.userDataService.updUserProfileAddAddress(undefined, this.address);
            console.log('guarda');
            loading.dismiss();
            const toast = await this.toastController.create({
                message: 'Dirección almacenada con exito',
                duration: 4000
            });
            toast.present();
            this.router.navigateByUrl('/user-address');
            
        } catch (err) {
            console.log('Excepcion e:' + err);
            loading.dismiss();
            const toast = await this.toastController.create({
                message: 'Error en el almacenamiento de la dirección',
                duration: 4000
            });
            toast.present();
            this.toggleView(ViewOptionEnum.address);
        }

    }
}
