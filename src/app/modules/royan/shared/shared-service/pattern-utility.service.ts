import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PatternUtilityService {

    thousandSeparator(value: any): any {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    removeCommaAndChar(value: any): any {
        return value.toString().replace(/,/g, '').replace(/\D/g, '');
    }

    removeComma(value: any): any {
        return value.toString().replace(/,/g, '');
    }
}
