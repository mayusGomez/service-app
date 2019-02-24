import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, IonList } from '@ionic/angular';

import { UserDataService } from '../../services/user-data.service';
import { UserProfile } from '../../models/user-profile';
import { Address } from '../../models/generic';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.page.html',
  styleUrls: ['./user-address.page.scss'],
})
export class UserAddressPage implements OnInit {

  @ViewChild('slidingList') slidingList: IonList;
  public userProfileSubs$: Observable<UserProfile>;

  constructor(
    private router: Router ,
    private userDataServices: UserDataService,
    public alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {  }

  ngOnInit() {
    this.userProfileSubs$ = this.userDataServices.getUserProfile();
  }

  addAddress(){
    this.router.navigateByUrl(`/user-address/add-address/`);
  }

  async deleteAddress(address:Address){

    await this.slidingList.closeSlidingItems();
    
    console.log(`Address:${ JSON.stringify(address)}`);
    const loading = await this.loadingController.create({
      message: 'Eliminando direccion',
      duration: 10000
    });
    loading.present();

    try{
      await this.userDataServices.delUserProfileAddAddress(undefined, address);
      console.log('Elimina');
      loading.dismiss();
      const toast = await this.toastController.create({
          message: 'Dirección eliminada con exito',
          duration: 4000
      });
      toast.present();
      
    } catch (err) {
        console.log('Excepcion e:' + err);
        loading.dismiss();
        const toast = await this.toastController.create({
            message: 'Error en el la eliminación de la dirección',
            duration: 4000
        });
        toast.present();
    }

  }

}
