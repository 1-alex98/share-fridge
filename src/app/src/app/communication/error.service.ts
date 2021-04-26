import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  currentError: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
