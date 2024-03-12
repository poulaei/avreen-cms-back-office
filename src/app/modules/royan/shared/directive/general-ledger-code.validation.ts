import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
    selector: '[generalLedgerCodeValidation]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: GeneralLedgerCodeValidation,
        multi: true
    }]
})
export class GeneralLedgerCodeValidation implements Validator {

    // @ts-ignore
    validate(control: AbstractControl): { [key: string]: any } | null {
        let replace = control.value.replace(/,/g, '').replace(/\D/g, '');
        if (!isNaN(replace) && replace.length !== 3 && replace.length > 0) {
            return {'notInRange': true};
        }
    }
}
