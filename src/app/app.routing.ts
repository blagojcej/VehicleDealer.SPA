import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'vehicles/new', component: VehicleFormComponent },
  { path: 'vehicles/:id', component: VehicleFormComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: '**', redirectTo: 'home' }
];
