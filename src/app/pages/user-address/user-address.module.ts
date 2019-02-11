import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserAddressPage } from './user-address.page';
import { CitiList } from './citi-list';

const routes: Routes = [
  { 
    path: '', 
    component: UserAddressPage 
  },
  { path: 'cities', component: CitiList },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserAddressPage, CitiList]
})
export class UserAddressPageModule {}
