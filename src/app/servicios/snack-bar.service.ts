import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

 
  // static snackBar:MatSnackBar;
  constructor(private snackBar:MatSnackBar) {
    
   }

   openSnackBar(message: string, action: string,duration=2000) {
    this.snackBar.open(message, action, {
      duration,
    });
    // return SnackBarService.openSnackBar
  }
}
