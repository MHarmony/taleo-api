import axios, { AxiosError } from 'axios';
import { Client } from '../client';
import { Region as RegionModel } from '../../models/region';
import { GetAllRegionsResponse } from '../../responses/region/get_all_regions_response';
import { GetRegionResponse } from '../../responses/region/get_region_response';
import { ActionResponse } from '../../responses/action_response';
import { GenericResponse } from '../../responses/generic_response';
import { ErrorResponse } from '../../responses/error_response';

export class Region {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async create(regionName: string, regionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<RegionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/region`, {
                    region: {
                        regionName: regionName,
                        regionCode: regionCode,
                        description: description,
                        associatedUsers: associatedUsers,
                        associatedDepartments: associatedDepartments,
                        requisitionApprovers: requisitionApprovers
                    }
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.id));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async delete(regionId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                await axios.delete<GenericResponse>(`${meta.serviceUrl}/object/region/${regionId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(true);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getById(regionId: number): Promise<RegionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetRegionResponse>(`${meta.serviceUrl}/object/region/${regionId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(resp.data.response.region);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getByName(regionName: string): Promise<RegionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetRegionResponse>(`${meta.serviceUrl}/object/region`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }, params: {
                        name: regionName
                    }
                });

                resolve(resp.data.response.region);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getAll(): Promise<RegionModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetAllRegionsResponse>(`${meta.serviceUrl}/object/region`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                let regions: RegionModel[] = [];
                resp.data.response.regions.forEach(x => regions.push(x.region));

                resolve(regions);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async updateById(regionId: number, regionName?: string, regionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<RegionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/region/${regionId}`, {
                    region: {
                        regionName: regionName,
                        regionCode: regionCode,
                        description: description,
                        associatedUsers: associatedUsers,
                        associatedDepartments: associatedDepartments,
                        requisitionApprovers: requisitionApprovers
                    }
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.id));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async updateByName(regionName: string, newRegionName?: string, regionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/region?name=${regionName}`, {
                    region: {
                        regionName: newRegionName,
                        regionCode: regionCode,
                        description: description,
                        associatedUsers: associatedUsers,
                        associatedDepartments: associatedDepartments,
                        requisitionApprovers: requisitionApprovers
                    }
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.id));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async upsert(regionName: string, regionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<RegionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/region?upsert=true`, {
                    region: {
                        regionName: regionName,
                        regionCode: regionCode,
                        description: description,
                        associatedUsers: associatedUsers,
                        associatedDepartments: associatedDepartments,
                        requisitionApprovers: requisitionApprovers
                    }
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.id));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }
}
