import {Pipe, PipeTransform} from '@angular/core';
import {PatternUtilityService} from "../../shared-service/pattern-utility.service";


@Pipe({
    name: 'dataPropertyGetter'
})
export class DataPropertyGetterPipe implements PipeTransform {

    constructor(private patternUtilityService: PatternUtilityService) {

    }

    transform(object: any, tableColumn: any, ...args: unknown[]): unknown {
        if (tableColumn.type === 'money') {
            return this.patternUtilityService.thousandSeparator(object[tableColumn.dataKey]);
        }
        return object[tableColumn.dataKey];
    }
}
