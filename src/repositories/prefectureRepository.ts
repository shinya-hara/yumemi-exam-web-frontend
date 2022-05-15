import { AxiosInstance } from 'axios';
import { ApiClient } from './apiClient';

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export class PrefectureRepository {
  constructor(private client: AxiosInstance = new ApiClient().client) {}

  public async getList(): Promise<Prefecture[]> {
    const { data } = await this.client.get<{
      message: string | null;
      result: Prefecture[];
    }>('/api/v1/prefectures');
    return data.result;
  }
}
