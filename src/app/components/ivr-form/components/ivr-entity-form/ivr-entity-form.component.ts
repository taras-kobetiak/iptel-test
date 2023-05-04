import { Component, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DataService, IData } from './services/data.service';

@Component({
  selector: 'app-ivr-entity-form',
  templateUrl: './ivr-entity-form.component.html',
  styleUrls: ['./ivr-entity-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IvrEntityFormComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => IvrEntityFormComponent),
  }],
})
export class IvrEntityFormComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  onChange: any = () => { };
  onTouched: any = () => { };
  onValidationChange: any = () => { };
  ivrEntytyForm: FormGroup;
  data: IData;

  private unsubscribingData$: Subject<void> = new Subject<void>();

  get buttonsControls(): FormArray {
    return this.ivrEntytyForm.get('arrayItemsControl') as FormArray;
  }

  get buttonsItems(): FormGroup[] {
    return this.buttonsControls.controls as FormGroup[];
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.createIvrEntityForm();
    this.data = this.dataService.getData();

    this.ivrEntytyForm.valueChanges.pipe(
      takeUntil(this.unsubscribingData$)
    ).subscribe((form: FormGroup) => {
      this.onChange(form);
      this.onValidationChange();
    })
  }

  createIvrEntityForm(): void {
    this.ivrEntytyForm = this.fb.group({
      arrayItemsControl: this.fb.array([
        this.fb.group({
          button: [`Button 0`, [Validators.required]],
          actions: this.fb.array([
            this.fb.control('', [Validators.required]),
            this.fb.control('', [Validators.required])
          ], [Validators.required]),
          status: [, [Validators.required]]
        })
      ])
    })
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getButtonActionsControl(i: number): FormArray {
    return this.buttonsItems[i].controls['actions'] as FormArray;
  }

  removeArrayItem(i: number): void {
    this.buttonsControls.removeAt(i);
  }

  deleteButtonAction(i: number, j: number): void {
    const actions = this.getButtonActionsControl(i);
    actions.removeAt(j)
  }

  addButtonAction(i: number): void {
    const actions = this.getButtonActionsControl(i);
    actions.push(this.fb.control('', [Validators.required]));
  }

  addArrayItem(): void {
    const buttonIndex = this.setButtonIndex();

    this.buttonsControls.push(
      this.fb.group({
        button: [`Button ${buttonIndex}`, [Validators.required]],
        actions: this.fb.array([
          this.fb.control('', [Validators.required]),
          this.fb.control('', [Validators.required])
        ], [Validators.required]),
        status: ['', [Validators.required]]
      })
    )
  }

  setButtonIndex(): number {
    let currentButtons: string[] = [];
    for (let elem of this.buttonsControls.value) {
      currentButtons = [...currentButtons, elem.button]
    }
    const buttonIndex: number = 0;
    return this.chackIndex(currentButtons, buttonIndex);
  }

  chackIndex(currentButtons: string[], buttonIndex: number): number {
    return !currentButtons.includes(`Button ${buttonIndex}`) ? buttonIndex :
      this.chackIndex(currentButtons, ++buttonIndex)
  }

  validate(): ValidationErrors | null {
    return this.ivrEntytyForm.status === 'INVALID' ? { err: 'invalid data' } :
      null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  ngOnDestroy(): void {
    this.unsubscribingData$.next();
    this.unsubscribingData$.complete();
  }

}
