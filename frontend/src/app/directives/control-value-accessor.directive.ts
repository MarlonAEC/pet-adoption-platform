import { Directive, Inject, Injector, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, startWith, Subject, takeUntil, tap } from 'rxjs';

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true
})
export class ControlValueAccessorDirective<T> implements ControlValueAccessor, OnInit{
  control: FormControl<T | null> | undefined;
  isRequired: boolean = false;
  private _isDisabled: boolean = false;
  private readonly _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  constructor(@Inject(Injector) private readonly injector: Injector) {
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const formControl = this.injector.get(NgControl);

      if (formControl.constructor === FormControlName) {
        this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName);
      } else {
        this.control = (formControl as FormControlDirective).form;
      }
    } catch (error) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    if (this.control) {
      this.control.setValue(value);
    } else {
      this.control = new FormControl<T | null>(value);
    }
  }

  registerOnChange(fn: (val: T | null) => T): void {
    this.control?.valueChanges.pipe(
      takeUntil(this._destroy$),
      startWith(this.control?.value),
      distinctUntilChanged(),
      tap((val) => fn(val))
    ).subscribe(() => this.control?.markAsUntouched());
  }

  registerOnTouched(fn: () => T): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }
}
