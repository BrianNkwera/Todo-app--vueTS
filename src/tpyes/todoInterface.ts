export interface EditToDoType {
  id: string;
  title?: string;
  completd?: string;
  lastUpdated: string;
}

export interface TodoType {
  id: string;
  title: string;
  completed: boolean;
  created: string;
  lastUpdated: string;
}

export interface MessageResponseType {
  httpStatus: string;
  httpStatusCode: number;
  status: string;
  message: string;
}
