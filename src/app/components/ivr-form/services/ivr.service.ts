import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IvrService {

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);


  checkIvrName(control: AbstractControl): Observable<ValidationErrors | null> {
    const testExistingName: string[] = ['name1', 'test', ' test name for IVR'];

    return testExistingName.includes(control.value) ?
      of({ err: 'err' }).pipe(delay(1500)) :
      of(null).pipe(delay(1500))
  }

}
