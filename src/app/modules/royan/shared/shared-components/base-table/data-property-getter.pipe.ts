import {Pipe, PipeTransform} from '@angular/core';
import {PatternUtilityService} from "../../shared-service/pattern-utility.service";
import {DateService} from "../../shared-service/date.service";


@Pipe({
    name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

    constructor(private patternUtilityService: PatternUtilityService,
                public dateService: DateService) {

    }

    transform(object: any, tableColumn: any, ...args: unknown[]): unknown {
        let objectElement = object[tableColumn.dataKey ? tableColumn.dataKey : tableColumn.columnDefinitionName];
        if (tableColumn.type === 'money') {
            return this.patternUtilityService.thousandSeparator(objectElement);
        } else if (tableColumn.type && tableColumn.type === 'date' && objectElement) {
            objectElement = this.dateService.calcDateTo(objectElement);
        }
        return objectElement;
    }
}
