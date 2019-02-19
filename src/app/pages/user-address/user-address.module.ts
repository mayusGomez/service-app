import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserAddressPage } from './user-address.page';
//import { CitiList } from './citi-list';
import { AddAddress } from './add-address';

const routes: Routes = [
  { 
    path: '', 
    component: UserAddressPage 
  },
  //{ path: 'cities', component: CitiList },
  { path: 'add-address', component: AddAddress },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserAddressPage, AddAddress]
})
export class UserAddressPageModule {}
