import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[customMax][formControlName],[customMax][formControl],[customMax][ngModel]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxValidatorDirective, multi: true}]
})
export class CustomMaxValidatorDirective {

  @Input()
  customMax: number;

  validate(c: FormControl): { [key: string]: any } {
    const v = c.value;
    return (v > this.customMax) ? {'customMax': true} : null;
  }

}
