export class Root {

}

export class Box {
    id: string;
    section: string;
    title: string;
    action: string;
    actionUrl: string;
    summary: string;
    status: number;
    description: string;
    concurrencyStamp: string;
}

export class BoxItem {
    id: string;
    boxId: string;
    title: string;
    action: string;
    actionUrl: string;
    summary: string;
    icon: string;
    description: string;
    concurrencyStamp: string;
    mediaId: string;
}
