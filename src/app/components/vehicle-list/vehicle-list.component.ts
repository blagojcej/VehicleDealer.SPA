import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  // allVehicles: Vehicle[];
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe((makes: KeyValuePair[]) => {
        this.makes = makes;
      });

    this.populateVehicles();
  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe((data: Vehicle[]) => {
        // this.vehicles = this.allVehicles = data;
        this.vehicles = data;
      });
  }

  onFilterChange() {
    // var vehicles = this.allVehicles;

    // if (this.filter.makeId) {
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
    // }

    // if (this.filter.modelId) {
    //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
    // }

    // this.vehicles = vehicles;

    // EXAMPLE FOR FILTERING BY THE MODEL ID
    // this.filter.modelId = 2;
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

}
