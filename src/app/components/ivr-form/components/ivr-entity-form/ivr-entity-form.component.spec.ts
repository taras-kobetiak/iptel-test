import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrEntityFormComponent } from './ivr-entity-form.component';

describe('IvrEntityFormComponent', () => {
  let component: IvrEntityFormComponent;
  let fixture: ComponentFixture<IvrEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IvrEntityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IvrEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
