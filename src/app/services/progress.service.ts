import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private uploadProgress: Subject<any>;
  // downloadProgress: Subject<any> = new Subject();

  startTracking() {
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress) {
    this.uploadProgress.next(progress);
  }

  endTracking() {
    this.uploadProgress.complete();
  }

  constructor() { }

}

import { BrowserXhr } from '@angular/http';

@Injectable()
export class BrowserXhrWithProgressService extends BrowserXhr {

  constructor(private service: ProgressService) { super(); }

  build(): XMLHttpRequest {
    const xhr: XMLHttpRequest = super.build();

    // xhr.onprogress = (event) => {
    //   this.service.downloadProgress.next(this.createProgress(event));
    // }
    xhr.upload.onprogress = (event) => {
      this.service.notify(this.createProgress(event));
    }

    xhr.upload.onloadend = () => {
      //console.log("BEFORE", this.service.uploadProgress);
      this.service.endTracking();
      //console.log("AFTER", this.service.uploadProgress);
    }

    return xhr;
  }

  private createProgress(event) {
    return {
      total: event.total,
      percentage: Math.round(event.loaded / event.total * 100)
    };
  }
}

// XMLHttpRequest
// BrowserXhr
