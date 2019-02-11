import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth.guard.service';

const routes: Routes = [
  //{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate:[AuthGuardService]}, 
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule'  },
  { path: 'signup', loadChildren: './pages/signup/signup.module#SignupPageModule' },
  { path: 'user-acount', loadChildren: './pages/user-acount/user-acount.module#UserAcountPageModule', canActivate:[AuthGuardService] },
  { path: 'user-address', loadChildren: './pages/user-address/user-address.module#UserAddressPageModule', canActivate:[AuthGuardService] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
