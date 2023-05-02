import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrFormComponent } from './ivr-form.component';

describe('IvrFormComponent', () => {
  let component: IvrFormComponent;
  let fixture: ComponentFixture<IvrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvrFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
