import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';
import { Ivr } from 'src/app/abstract-classes/ivr';

@Injectable({
  providedIn: 'root'
})
export class IvrService {

  currentIvr: Ivr;

  setIvr(ivr: Ivr): void {
    this.currentIvr = JSON.parse(JSON.stringify(ivr));
  }

  getIvr(): Ivr {
    return this.currentIvr;
  }

  checkIvrName(control: AbstractControl): Observable<ValidationErrors | null> {
    const testExistingName: string[] = ['name1', 'test', ' test name for IVR'];

    return testExistingName.includes(control.value) ?
      of({ err: 'err' }).pipe(delay(1500)) :
      of(null).pipe(delay(1500))
  }

}
