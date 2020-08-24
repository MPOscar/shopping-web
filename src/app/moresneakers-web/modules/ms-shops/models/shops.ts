export class WeekHours {
  dayOfWeek?: number;
  openHour?: string;
  closeHour?: string;
  shopId?: string;
  notWorking?: boolean;
}

export class ShopImage {
  id?: string;

  createdBy?: string;

  updatedBy?: string;

  createdAt?: string;

  updatedAt?: string;

  fileName?: string;

  imgUrl?: string

  state?: any;

  status?: any;

  file?: File;

  mainImage?: boolean;
}

export class Shop {

  active?: boolean;

  address?: string;

  brand?: string;

  category?: string;

  createdAt?: Date;

  currency?: string;

  createdBy?: Date;

  description?: string;

  faces?: Array<any>;

  id?: string;

  images?: Array<any>;

  makeDeal?: boolean;

  mainImage?: string;

  smallImage?: string;

  headerImage?: string;

  name: string;

  rank?: string;

  region?: string;

  country?: string;

  shippingDetails?: string;

  shippingCountries?: string;

  showOnRegion?: string;

  countries?: any;

  trackingListBaseUrl?: string;

  updatedAt?: Date;

  workingHours?: Array<WeekHours>;

  linked?: boolean;

  checked?: boolean;

  zipCode?: string;

  isParent?: boolean;

  parent?: string;

  lat?: number;

  lon?: number;

  type?: string;
}

export class ShopsListResponse {
  data: Shop[];
  dataCount: number;
}

export class ShopsResponse {
  data: Shop;
}

export class ShopsImagesListResponse {
  data: Array<any>;
  dataCount: number;
}

export class ShopImagesResponse {
  data: any[];
}

export class EditShopModel extends Shop {

  deletedFaces?: Array<string>;
}
