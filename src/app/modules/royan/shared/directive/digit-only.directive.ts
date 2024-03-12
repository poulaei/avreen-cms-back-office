import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
    selector: 'input[digitOnly]',
})
export class DigitOnlyDirective {

    constructor(private _inputEl: ElementRef) {
    }

    @HostListener('input', ['$event'])
    onInput(event: any) {
        const initialValue = this._inputEl.nativeElement.value;
        this._inputEl.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
        if (initialValue !== this._inputEl.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
