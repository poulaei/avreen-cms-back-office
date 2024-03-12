import {FormGroup} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FormControlService {

    isControlValid(formGroup: FormGroup, controlName: string): boolean {
        const control = formGroup.controls[controlName];
        return control.valid && (control.dirty || control.touched);
    }

    isControlInvalid(formGroup: FormGroup, controlName: string): boolean {
        const control = formGroup.controls[controlName];
        return control.invalid && (control.dirty || control.touched);
    }

    controlHasError(formGroup: FormGroup, validation: string, controlName: string): boolean {
        const control = formGroup.controls[controlName];
        return control.hasError(validation) && (control.dirty || control.touched);
    }

}
