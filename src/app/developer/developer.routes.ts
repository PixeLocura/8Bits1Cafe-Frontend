import { Routes } from '@angular/router';
import { DeveloperProfileComponent } from './components/developer-profile/developer-profile';

export const developerRoutes: Routes = [
    {
        path: ':id',
        component: DeveloperProfileComponent
    }
];
