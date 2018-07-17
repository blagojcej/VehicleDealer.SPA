import { SaveVehicle, Vehicle } from './../../models/vehicle';
import { Feature } from './../../models/feature';
import { AlertifyService } from './../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Model } from '../../models/model';
import { Make } from '../../models/make';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { of } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Make[];
  models: Model[];
  features: Feature[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };

  constructor(private vehicleService: VehicleService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private router: Router) {

    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }

  ngOnInit() {
    // const sources = [
    //   of(this.vehicleService.getMakes()),
    //   of(this.vehicleService.getFeatures())
    // ];

    // forkJoin(
    //  sources
    ////   of(this.vehicleService.getMakes()),
    ////   of(this.vehicleService.getFeatures()),
    ////   of(this.vehicleService.getVehicle(this.vehicle.id))
    // )
    //   .subscribe(([data1, data2, data3]) => {
    //     this.makes = data1;
    //     this.features = data2;
    //     this.vehicle = data3;
    //   });

    this.vehicleService.getMakes()
      .subscribe((makes: Make[]) => {
        this.makes = makes;
        // console.log("MAKES", makes);
      });

    this.vehicleService.getFeatures()
      .subscribe((features: Feature[]) => {
        this.features = features;
        // console.log("FEATURES", features);
      });

    if (this.vehicle.id) {
      // sources.push(of(this.vehicleService.getVehicle(this.vehicle.id)));
      this.vehicleService.getVehicle(this.vehicle.id)
        .subscribe((v: Vehicle) => {
          // this.vehicle = v;
          this.setVehicle(v);
          this.populateModels();
        });
    }
  }

  onMakeChange() {
    this.populateModels();
    // // console.log('VEHICLE', this.vehicle);
    // // console.log('MAKES', this.makes);
    // // debugger;
    // const selectedMake = this.makes.find(m => m.id === +this.vehicle.makeId);
    // // console.log('SELECTED MAKE', selectedMake);
    // this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  private populateModels() {
    // console.log('VEHICLE', this.vehicle);
    // console.log('MAKES', this.makes);
    // debugger;
    const selectedMake = this.makes.find(m => m.id === +this.vehicle.makeId);
    // console.log('SELECTED MAKE', selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe((v: Vehicle) => {
          this.alertifyService.success('Successfully Update the Vehicle.');
          this.setVehicle(v);
          this.populateModels();
        });
    } else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => {
          console.log(x);
          this.alertifyService.success('Successfully created new vehicle');
          // }, err => {
          //   if (err.status === 400) {
          //     this.alertifyService.error(err);
          //   }
        });
    }
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/home']);
        })
    }
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

}
