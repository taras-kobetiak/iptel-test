import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Ivr } from 'src/app/abstract-classes/ivr';
import { IvrEntity } from 'src/app/abstract-classes/ivr-entity';
import { IvrService } from './services/ivr.service';

@Component({
  selector: 'app-ivr-form',
  templateUrl: './ivr-form.component.html',
  styleUrls: ['./ivr-form.component.scss']
})
export class IvrFormComponent implements OnInit {

  ivrForm: FormGroup;
  isLoading: boolean = false;



  constructor(private fb: FormBuilder, private ivrService: IvrService) { }

  ngOnInit(): void {
    this.createIvrForm();


    this.ivrForm.valueChanges.subscribe(v => {
      console.log(this.ivrForm);

    })

  }

  createIvrForm(): void {
    this.ivrForm = this.fb.group({
      // id: '',
      name: ['', [Validators.required], [this.ivrService.checkIvrName]],
      description: '',
      announcement: '',
      timeout: '',
      invalidRetries: '',

      // appendInvalidRetryRecording: '',
      // appendAnnouncementToTimeout: '',
      // timeoutRetries: '',
      // timeoutRetryRecording: '',
      // timeoutRecording: '',
      // timeoutDestination: '',

      ivrEntityList: [[], Validators.required]
    })
  }

  onSubmit(): void {
    const mainId = this.createId();


    console.log(mainId);


    const ivrEntity: IvrEntity[] = [{
      id: 0,
      name: '',
      matchedAction: '',
      matchedData: '',
      ivrId: 0,
      leadStatus: ''
    }]

    const ivr: Ivr = {
      id: 0,
      name: '',
      description: '',
      announcement: '',
      timeout: 0,
      invalidRetries: 0,

      ivrEntityList: ivrEntity,

      appendInvalidRetryRecording: false,
      appendAnnouncementToTimeout: false,
      timeoutRetries: 0,
      timeoutRetryRecording: '',
      timeoutRecording: '',
      timeoutDestination: '',
    }
  }

  createId(): number {
    return Math.floor(Math.random() * 1000000000);
  }

}

