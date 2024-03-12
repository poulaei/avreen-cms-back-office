import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[accountCodeValidation]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: AccountCodeValidation,
        multi: true
    }]
})
export class AccountCodeValidation implements Validator {

    // @ts-ignore
    validate(control: AbstractControl): { [key: string]: any } | null {
        let replace = control.value.replace(/,/g, '').replace(/\D/g, '');
        if (!isNaN(replace) && replace.length > 0) {
            if (+control.value < 1 || +control.value > 9) {
                return {'notInRange': true};
            }
        }
    }
}
