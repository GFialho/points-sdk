import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  AddPointsRequest,
  AddPointsResponse,
  CreateProjectRequest,
  CreateProjectResponse,
  GetPointsRequest,
  GetPointsResponse,
} from "./interface";

enum SDKErrorType {
  NetworkError = "NetworkError",
  ServerError = "ServerError",
  UnauthorizedError = "UnauthorizedError",
  ValidationError = "ValidationError",
  UnknownError = "UnknownError",
}

export class LoyaltySdk {
  baseUrl: string;
  apiKey: string;

  constructor(apiKey: string) {
    this.baseUrl = "https://04b3n0ge33.execute-api.us-east-1.amazonaws.com/dev";
    this.apiKey = apiKey;
  }

  private async call<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await axios({
        ...config,
        baseURL: this.baseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: this.apiKey,
        },
      });
    } catch (error) {
      return Promise.reject(this.handleAxiosError(error));
    }
  }

  private handleAxiosError(error: AxiosError): Error {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return new Error(SDKErrorType.NetworkError);
      }

      const { status } = error.response;

      switch (status) {
        case 401:
          return new Error(SDKErrorType.UnauthorizedError);
        case 400:
          return new Error(SDKErrorType.ValidationError);
        case 404:
        case 500:
          return new Error(SDKErrorType.ServerError);
        default:
          return new Error(SDKErrorType.UnknownError);
      }
    }

    return new Error(SDKErrorType.UnknownError);
  }

  public async getPoints(
    data: GetPointsRequest
  ): Promise<GetPointsResponse | Error> {
    try {
      const response = await this.call<GetPointsResponse>({
        method: "get",
        url: `points/${data.address}`,
        params: { eventName: data.eventName },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async addPoints(
    data: AddPointsRequest
  ): Promise<AddPointsResponse | Error> {
    try {
      const response = await this.call<AddPointsResponse>({
        method: "post",
        url: `add/points/${data.address}`,
        data: { points: data.amount, eventName: data.eventName },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async createProject(
    data: CreateProjectRequest
  ): Promise<CreateProjectResponse | Error> {
    try {
      const response = await this.call<CreateProjectResponse>({
        method: "post",
        url: "project",
        data: { id: data.id },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
