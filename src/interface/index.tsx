export interface GetPointsRequest {
  address: string;
  eventName?: string;
}

export interface GetPointsResponse {
  balance: number;
}

export interface AddPointsRequest {
  address: string;
  amount: number;
  eventName: string;
}

export interface AddPointsResponse {
  balance: number;
}

export interface CreateProjectRequest {
  id?: string;
}

export interface CreateProjectResponse {
  id: string;
  apiKey: string;
}
