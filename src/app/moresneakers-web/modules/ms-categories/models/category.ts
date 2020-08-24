export class Category {
    id?: string;
    name: string;
    imgUrl?: string;
    description?: string;
    updatedAt?: string;
    createdAt?: string;
}

export class CategoriesListResponse {
    data: Category[];
    dataCount: number;
}

export class CategoriesResponse {
    data: Category;
}
