import { Feature } from './../../models/feature';
import { AlertifyService } from './../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Model } from '../../models/model';
import { Make } from '../../models/make';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Make[];
  models: Model[];
  features: Feature[];
  vehicle: any = {
    features: [],
    contact: {}
  };

  constructor(private vehicleService: VehicleService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
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
  }

  onMakeChange() {
    // console.log('VEHICLE', this.vehicle);
    // console.log('MAKES', this.makes);
    // debugger;
    const selectedMake = this.makes.find(m => m.id === +this.vehicle.makeId);
    // console.log('SELECTED MAKE', selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
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
    this.vehicleService.create(this.vehicle)
      .subscribe(x => {
        console.log(x);
        this.alertifyService.success('Succesfully created new vehicle');
      }, err => {
        if (err.status === 400) {
          this.alertifyService.error(err);
        }
      });
  }

}
