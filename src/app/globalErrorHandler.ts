import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error: { message: string }) {
    alert(error.message);
  }
}
