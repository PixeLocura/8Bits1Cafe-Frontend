import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileLayout} from './layouts/profile-layout/profile-layout';
import {Overview} from './components/overview/overview';
import {Favourites} from './components/favourites/favourites';
import {Settings} from './components/settings/settings';
import {Account} from './components/account/account';
import {LibraryLayout} from './layouts/library-layout/library-layout';
import {Library} from './components/library/library';
import {Orders} from './components/orders/orders';
import {Wishlist} from './components/wishlist/wishlist';

const routes: Routes = [
  {
    path: '',
    component: ProfileLayout,
    children: [

      {
        path: 'library',
        component: LibraryLayout,
        children: [
          { path: '',         component: Library    },
          { path: 'orders',   component: Orders     },
          { path: 'wishlist', component: Wishlist   },
        ]
      },


      {path: 'account', component: Account},
      {path: 'settings', component: Settings},


      { path: '', redirectTo: 'library', pathMatch: 'full' }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
