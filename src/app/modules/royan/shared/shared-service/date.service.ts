import {Injectable} from "@angular/core";
import * as moment from "jalali-moment";

@Injectable({
    providedIn: 'root'
})
export class DateService {

    calcDateTo(birthDate: any): string {
        const localDate = moment(birthDate).locale('fa').format('YYYY/MM/DD HH:mm:ss');
        return localDate.toString();
    }

    calcDateFrom(birthDate: any): any {
        return moment.from(birthDate, 'fa', 'YYYY/MM/DD');
    }
}
