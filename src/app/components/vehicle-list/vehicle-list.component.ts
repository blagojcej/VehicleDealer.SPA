import { QueryResult } from './../../models/queryresult';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE = 3;

  vehicles: Vehicle[];
  // allVehicles: Vehicle[];
  makes: KeyValuePair[];
  queryResult: QueryResult<Vehicle>[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id', },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    {}
  ];

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe((makes: KeyValuePair[]) => {
        this.makes = makes;
      });

    this.populateVehicles();
  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((result: QueryResult<Vehicle>[]) => {
        // this.vehicles = this.allVehicles = data;
        // console.log(result);
        this.queryResult = result;
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
    this.query.page = 1;
    this.populateVehicles();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    // this.onFilterChange();
    this.populateVehicles();
  }

  sortBy(columnName) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.populateVehicles();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }

}
