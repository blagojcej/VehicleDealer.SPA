import { ProfileComponent } from './components/profile/profile.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'vehicles/new', component: VehicleFormComponent },
  { path: 'vehicles/edit/:id', component: VehicleFormComponent },
  { path: 'vehicles/:id', component: ViewVehicleComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: '**', redirectTo: 'home' }
];
