import { Injectable } from '@angular/core';
import { Session } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  session:Session
}
