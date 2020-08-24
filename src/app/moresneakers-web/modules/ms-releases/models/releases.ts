import { Status } from "../../ms-offers/models/status";
import * as moment from 'moment-timezone';
import {Shop} from '../../ms-shops/models/shops';

//import { Face, State, Status } from '../../../../ui/modules/images-card/models/face';

export class MainImage {
    mainImage: string
}

export class ReleaseImage {
    id?: string;

    createdBy?: string;

    updatedBy?: string;

    createdAt?: string;

    updatedAt?: string;

    fileName?: string;

    imgUrl?: string

    //state?: State;

    status?: Status;

    file?: File;

    mainImage?: boolean;
}

export class Release {
    id?: string;

    name: string;

    slug: string;

    status?: string;

    collectionId?: string;

    children?: boolean;

    color?: any;

    currency?: string;

    description?: string;

    sku?: string;

    images?: ReleaseImage[];

    gender?: string;

    hot?: boolean;

    mainImage?: string;

    price?: number;

    releaseDate?: Date;

    updatedAt?: Date;

    createdAt?: Date;

    //faces?: Array<Face>;

    supplierColor?: string;

    upcoming?: boolean;

    customized?: boolean;

    notSchedule?: boolean;

    styleId?: string;
}

export class ReleasesListResponse {
    data: Release[];
    dataCount: number;
}

export class ReleasesImagesListResponse {
    data: ReleaseImage[];
    dataCount: number;
}

export class ReleaseResponse {
    data: Release;
}

export class ReleaseImagesResponse {
    data: ReleaseImage;
}

export class EditReleaseModel extends Release {

    deletedFaces?: Array<string>;
}

export class ReleaseShopOffer {
  shopName?: string;
  logo?: string;
  status?: string;
  shipping?: string;
  links?: any[];
  rank?: number;
  parentShop?: string;
  pickUp?: string; // raffle
  date?: string; // raffle
}

export class ReleaseShopOfferGroup {
  shopId?: string;
  shopName?: string;
  logo?: string;
  offers: ReleaseShopOffer[];
}
