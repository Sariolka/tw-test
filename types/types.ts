export interface IData {
  id: number;
  status: string;
  date_created: number;
  name: string;
  brand: string;
  price: number;
  color: string;
  stock: number;
}

export interface IDataResponse {
  data: IData[];
  error?: {
    message: string;
  };
}

