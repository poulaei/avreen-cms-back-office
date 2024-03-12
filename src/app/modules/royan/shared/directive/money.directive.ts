import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
    selector: 'input[moneyInput]',
})
export class MoneyDirective {

    constructor(private _inputEl: ElementRef) {
    }

    @HostListener('input', ['$event'])
    onInput(event: any) {
        if (this._inputEl.nativeElement.value === '-' || this._inputEl.nativeElement.value === '.') {
            this._inputEl.nativeElement.value = '';
            return;
        }
        let commasRemoved = this._inputEl.nativeElement.value.replace(/,/g, '');
        let toInt: number;
        let toLocale: string;
        toInt = parseInt(commasRemoved);
        toLocale = toInt.toLocaleString('en-US');
        if (toLocale === 'NaN') {
            this._inputEl.nativeElement.value = '';
        } else {
            this._inputEl.nativeElement.value = toLocale;
        }
    }
}
