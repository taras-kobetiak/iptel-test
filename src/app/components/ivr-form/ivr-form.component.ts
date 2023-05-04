import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ivr } from 'src/app/abstract-classes/ivr';
import { IvrEntity } from 'src/app/abstract-classes/ivr-entity';
import { IvrService } from '../services/ivr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ivr-form',
  templateUrl: './ivr-form.component.html',
  styleUrls: ['./ivr-form.component.scss']
})
export class IvrFormComponent implements OnInit {

  isBackButtonClicked: boolean = false;
  ivrForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ivrService: IvrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createIvrForm();
  }

  createIvrForm(): void {
    this.ivrForm = this.fb.group({
      name: ['', [Validators.required], [this.ivrService.checkIvrName]],
      description: '',
      announcement: '',
      timeout: '',
      invalidRetries: '',
      ivrEntityList: [[], Validators.required]
    })
  }

  onSubmit(): void {
    const mainId = this.createId();
    const values: any = this.ivrForm.value;
    const ivrEntity = this.createIvrEntityClass(values, mainId);
    const ivr: Ivr = this.createIvrClass(mainId, values, ivrEntity);

    this.ivrService.setIvr(ivr);
    this.router.navigate(['/result'])
  }

  createIvrEntityClass(values: any, mainId: number): IvrEntity[] {
    let ivrEntity: IvrEntity[] = [{
      id: this.createId(),
      name: '',
      matchedAction: [],
      matchedData: '',
      ivrId: mainId,
      leadStatus: ''
    }]

    for (let elem of values.ivrEntityList.arrayItemsControl) {
      ivrEntity = [...ivrEntity, {
        id: this.createId(),
        name: elem.button,
        matchedAction: elem.actions,
        matchedData: '',
        ivrId: mainId,
        leadStatus: elem.leadStatus
      }]
    }

    ivrEntity = ivrEntity.filter((el, index) => index !== 0);
    return ivrEntity;
  }

  createIvrClass(mainId: number, values: any, IvrEntity: IvrEntity[]): Ivr {
    const ivr: Ivr = {
      id: mainId,
      name: values.name,
      description: values.description,
      announcement: values.announcement,
      timeout: values.timeout,
      invalidRetries: values.invalidRetries,
      ivrEntityList: IvrEntity,
      appendInvalidRetryRecording: false,
      appendAnnouncementToTimeout: false,
      timeoutRetries: 0,
      timeoutRetryRecording: '',
      timeoutRecording: '',
      timeoutDestination: '',
    }
    return ivr;
  }

  createId(): number {
    return Math.floor(Math.random() * 1000000000);
  }

  onBackButtonClick(): void {
    this.isBackButtonClicked = true;
    setTimeout(() => this.isBackButtonClicked = false, 2500);
  }
}



