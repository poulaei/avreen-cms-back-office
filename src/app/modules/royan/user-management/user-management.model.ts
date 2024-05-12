export class UserModel {
    tenantId: string;
    userName: string;
    name: string;
    surname: string;
    email: string;
    emailConfirmed: boolean;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    isActive: boolean;
    lockoutEnabled: boolean;
    lockoutEnd: string;
    concurrencyStamp: string;
    entityVersion: number;
    isDeleted: boolean;
    deleterId: string;
    deletionTime: string;
    lastModificationTime: string;
    lastModifierId: string;
    creationTime: string;
    creatorId: string;
    id: string;
}
