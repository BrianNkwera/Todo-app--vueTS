export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
  created: string;
  lastUpdated: string;
}

export interface ErrorResponseType {
  httpStatus: string;
  httpStatusCode: number;
  status: string;
  message: string;
}
