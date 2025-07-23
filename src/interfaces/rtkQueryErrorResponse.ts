import type { IErrorResponse } from "./errorResponse";

export interface IRTKQueryErrorResponse {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR";
  // data?: IErrorResponse | unknown;
  data?: IErrorResponse;
  error?: string;
}
