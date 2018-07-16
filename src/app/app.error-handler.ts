import { ErrorHandler, Inject } from '@angular/core';
import { AlertifyService } from './services/alertify.service';

export class AppErrorHandler implements ErrorHandler {
    constructor(@Inject(AlertifyService) private alertifyService: AlertifyService) { }

    handleError(error: any): void {
        // console.log(error);
        this.alertifyService.error(error.message);
    }
}
