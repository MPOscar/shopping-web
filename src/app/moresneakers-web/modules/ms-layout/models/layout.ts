export class Slide {
    id?: string;
    type: string;
    entityId: string;
    entityType: string;
    imgUrl?: string;
    description: string;
}

export class OurPartner {
    id?: string;
    label?: string;
    layoutId?: string;
    slides?: Array<Slide>;
}

export class Sliders {
    slides: Slide[];
    display: string;
    displayOnPage?: boolean;
}

export class Header {
    display: string;
    imgUrl?:  string;
    link?: string;
    displayOnPage?: boolean;
    label?:  string;
}

export class MenuBrandsItem {
  id?: string;
  entityId: string;
  imgUrl?: string;
  collections: Array<string>;
}

export class MenuBrands {
  id?: string;
  slides: Array<MenuBrandsItem>;
}
