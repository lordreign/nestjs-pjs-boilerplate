export interface IErrorsResponse {
  [key: string]: string;
}

export interface IResponse {
  status?: number | null;
  data?: any;
  message?: string | null;
  error?: string | null;
  errors?: IErrorsResponse[] | null;
}
