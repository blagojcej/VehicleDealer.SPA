import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'vehicles/new', component: VehicleFormComponent},
  { path: 'vehicles/:id', component: VehicleFormComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
