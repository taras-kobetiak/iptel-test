import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-ivr-entity-form',
  templateUrl: './ivr-entity-form.component.html',
  styleUrls: ['./ivr-entity-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IvrEntityFormComponent),
    multi: true
  }]
})
export class IvrEntityFormComponent implements OnInit, ControlValueAccessor {

  onChange: any;
  onTouched: any;
  ivrEntytyForm: FormGroup;


  get buttonsControls(): FormArray {
    return this.ivrEntytyForm.get('arrayItemsControl') as FormArray;
  }

  get buttonsItems(): FormGroup[] {
    return this.buttonsControls.controls as FormGroup[];
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ivrEntytyForm = this.fb.group({
      arrayItemsControl: this.fb.array([
        this.fb.group({
          button: ['', [Validators.required]],

          actions: this.fb.array([
            this.fb.control('123'),
            this.fb.control('124')
          ], [Validators.required]),
          status: ['', [Validators.required]]
        })
      ])
    })


    this.ivrEntytyForm.valueChanges.pipe().subscribe((form: FormGroup) => {
      // console.log(form);
      this.onChange(form);
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
    (this.buttonsItems[i].controls['actions'] as FormArray)
      .removeAt(j)
  }

  addButtonAction(i: number): void {
    const buttons = this.buttonsItems[i].controls['actions'] as FormArray
    buttons.push(this.fb.control(''));
  }

  addArrayItem() {
    console.log(this.buttonsControls);

    this.buttonsControls.push(

      this.fb.group({
        button: ['', [Validators.required]],

        actions: this.fb.array([
          this.fb.control('1230'),
          this.fb.control('1240')
        ], [Validators.required]),
        status: ['', [Validators.required]]
      })

    )
  }
}
