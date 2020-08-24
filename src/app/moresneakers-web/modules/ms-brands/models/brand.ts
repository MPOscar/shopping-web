
export class Brand {
  id?: string;
  name: string;
  description?: string;
  imgUrl?: string;
  updatedAt?: string;
  createdAt?: string;
  popularStyle?: any;
}

export class BrandsListResponse {
  data: Brand[];
  dataCount: number;
}

export class BrandResponse {
  data: Brand;
}
