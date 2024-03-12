export class DataStringModel {
    group: any[] = [];
    skip: number;
    take: number;
    sort: SortData[] = [];
    filter: Filter = new Filter();
}

export class SortData {
    field: string;
    dir: string;
}

export class Filter {
    filters: FiltersItem[] = [];
    logic: string;
}

export class FiltersItem {
    filters: FilterValue[] = [];
    logic: string;
}

export class FilterValue {
    field: string;
    operator: string;
    value: string;
}

