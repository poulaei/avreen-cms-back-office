export class MenuManagementModel {
    extraProperties: ExtraProperties = new ExtraProperties();
    id: string;
    creationTime: string;
    creatorId: string;
    lastModificationTime: string;
    lastModifierId: string;
    parentId: string;
    displayName: string;
    isActive: boolean;
    url: string;
    icon: string;
    order: number;
    target: string;
    elementId: string;
    cssClass: string;
    pageId: string;
    concurrencyStamp: string;
}

export class ExtraProperties {
    DisplayPlace: string;
    Group: string;
    ContentBoxId: string;
}
