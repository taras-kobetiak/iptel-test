import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ivr-form',
  templateUrl: './ivr-form.component.html',
  styleUrls: ['./ivr-form.component.scss']
})
export class IvrFormComponent implements OnInit {

  ivrForm: FormGroup;

  private unsubscribingData$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createIvrForm();
  }

  createIvrForm(): void {
    this.ivrForm = this.fb.group({
      // id: '',
      name: ['', [Validators.required]],
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


      ivrEntityList: [[]]
    })
  }

  onSubmit(): void {
    console.log(this.ivrForm);

  }

}
