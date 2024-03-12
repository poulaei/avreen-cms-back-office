import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[digitOnlyValidation]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: DigitOnlyValidation,
        multi: true
    }]
})
export class DigitOnlyValidation implements Validator {

    // @ts-ignore
    validate(control: AbstractControl): { [key: string]: any } | null {
        const initialValue = control.value;
        if (initialValue) {
            if (control.value.length === 1 && initialValue !== control.value.replace(/[^0-9]*/g, '')) {
                return {'isNumber': true};
            }
        }
    }
}
