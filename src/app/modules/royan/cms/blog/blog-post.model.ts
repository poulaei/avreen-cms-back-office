export class BlogPostModel {
    id: string;
    blogId: string;
    blogName: string;
    title: string;
    slug: string;
    shortDescription: string;
    content: string;
    coverImageMediaId: string;
    creationTime: string;
    lastModificationTime: string;
    concurrencyStamp: string;
    status: number;
}

export class BlogPostTagModel {
    tags: string[];
    entityType: string;
    entityId: string;
}
