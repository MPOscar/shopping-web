export class Deal {
  createdAt?: string;
  displayOnSale?: boolean;
  endDate?: string;
  id?: string;
  imgUrl?: string;
  promoCode?: string;
  salePercentage?: number;
  status?: string;
  startDate?: string;
  time?: string;
  shopId?: string;
  updatedAt?: string;
  url?: string;
  trackedUrl?: string;
  bitlyUrl?: string;
}

export class DealsListResponse {
  data: Deal[];
  dataCount: number;
}

export class DealResponse {
  data: Deal;
}
