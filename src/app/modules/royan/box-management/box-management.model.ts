export class ContentBoxModel {
    id: string;
    parentId: string;
    section: string;
    title: string;
    actionType: string;
    action: string;
    actionUrl: string;
    summary: string;
    status: number;
    icon: string;
    description: string;
    mediaId: string;
    concurrencyStamp: string;
    children: ContentBoxModel[];
    extraProperties: any;
}
