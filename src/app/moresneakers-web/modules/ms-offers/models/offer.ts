export class link {
  text: string;
  url: string;
  trackedUrl: string;
  bitlyUrl: string;
}

export class Offer {
  description?: string;

  offerDate?: Date;

  id?: string;

  name: string;

  timezone: string;

  imgUrl?: string;

  updatedAt?: string;

  createdAt?: string;

  shopId?: string;

  retailPrice?: number;

  retailCurrency?: string;

  status?: string;

  releaseId?: string;

  releaseTime?: string;

  releaseTimeZone?: string;

  raffleTimeStart?: string;

  raffleTimeEnd?: string;

  raffleEnd?: string;

  salePrice?: number;

  salePercentage?: number;

  shipping?: string;

  displayOnWhatsNew?: boolean;

  price?: number;

  priceEUR?: number;

  priceGBR?: number;

  priceUSD?: number;

  links?: link[];

  raffle?: any;

  linked?: boolean;

  checked?: boolean;

  displayWhatsNew?: boolean;
}

export class OffersListResponse {
  data: Offer[];
  dataCount: number;
}

export class OfferResponse {
  data: Offer;
}
