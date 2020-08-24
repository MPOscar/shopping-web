
export class Styles {
  id?: string;
  name: string;
  brand?: string;
  createdAt?: string;
  description?: string;
  imgUrl?: string;
  updatedAt?: string;
}

export class StylesListResponse {
  data: Styles[];
  dataCount: number;
}

export class StyleResponse {
  data: Styles;
}
