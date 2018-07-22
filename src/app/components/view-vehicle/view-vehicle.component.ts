import { ProgressService } from './../../services/progress.service';
import { Photo } from './../../models/photo';
import { PhotoService } from './../../services/photo.service';
import { AlertifyService } from './../../services/alertify.service';
import { Vehicle } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: Vehicle;
  vehicleId: number;
  photos: Photo[];
  progress: any;
  subscription: any;

  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private alertifyService: AlertifyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicleId)
      .subscribe((photos: Photo[]) => {
        this.photos = photos;
      });

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        (v: Vehicle) => this.vehicle = v,
        err => {
          if (err.status === 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm('Are you sure?')) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  uploadPhoto() {
    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files[0];
    nativeElement.value = '';
    // debugger;
    this.subscription = this.progressService.startTracking()
      .subscribe(progress => {
        console.log(progress);
        this.zone.run(() => {
          this.progress = progress;
        });
      },
        null,
        () => {
          this.progress = null;
        });
    this.photoService.upload(this.vehicleId, file)
      .subscribe((photo: Photo) => {
        this.subscription.unsubscribe();
        this.photos.push(photo);
      }, err => {
        this.alertifyService.error(err);
      });
  }
}