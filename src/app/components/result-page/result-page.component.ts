import { Component, OnInit } from '@angular/core';
import { IvrService } from '../services/ivr.service';
import { Ivr } from 'src/app/abstract-classes/ivr';
import { Router } from '@angular/router';
import { IvrEntity } from 'src/app/abstract-classes/ivr-entity';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  currentIvr: Ivr;

  constructor(
    private ivrService: IvrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.currentIvr = this.ivrService.getIvr() || {
      name: '',
      ivrEntityList: []
    };;

    this.redirectToForm();
  }

  redirectToForm(): void {
    if (this.currentIvr.name === '') {
      setTimeout(() => {
        this.router.navigate(['']);
      }, 1500)
    }
  }

  backToIvrForm(): void {
    this.router.navigate(['']);
  }
}
