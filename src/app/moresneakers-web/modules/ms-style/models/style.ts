
export class Style {

    brand: string;

    category: string;

    categories: string[];

    createRelease?: boolean;

    createdAt?: string;

    description: string;    

    id?: string;

    isParent?: boolean;

    linkedShops?: Array<string>;

    name: string;

    parent?: string;

    updatedAt?: string;    

    selected?: boolean = false;  

}


export class StylesListResponse {
    data: Style[];
    dataCount: number;
}

export class StyleResponse {
    data: Style;
}