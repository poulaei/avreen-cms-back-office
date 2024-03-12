import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[percentValidation]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: PercentValidation,
        multi: true
    }]
})
export class PercentValidation implements Validator {

    // @ts-ignore
    validate(control: AbstractControl): { [key: string]: any } | null {
        if (!isNaN(control.value)) {
            if (+control.value < 0 || +control.value > 100) {
                return {'notInRange': true};
            }
        }
    }
}
