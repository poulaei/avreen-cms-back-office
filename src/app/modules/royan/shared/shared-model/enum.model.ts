import {RoyanResponseBaseModel} from "./royan-response-base.model";

export class EnumModel extends RoyanResponseBaseModel {
    data: EnumInfo[];
}

export class EnumInfo {
    id: number;
    title: string;
}
