import axios, { AxiosError } from 'axios';
import { Client } from '../client';
import { Location as LocationModel } from '../../models/location';
import { GetAllLocationsResponse } from '../../responses/location/get_all_locations_response';
import { GetLocationResponse } from '../../responses/location/get_location_response';
import { ActionResponse } from '../../responses/action_response';
import { GenericResponse } from '../../responses/generic_response';
import { ErrorResponse } from '../../responses/error_response';

export class Location {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async create(locationName: string, locationCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<LocationModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/location`, {
                    location: {
                        locationName: locationName,
                        locationCode: locationCode,
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

    public async delete(locationId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                await axios.delete<GenericResponse>(`${meta.serviceUrl}/object/location/${locationId}`, {
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

    public async getById(locationId: number): Promise<LocationModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetLocationResponse>(`${meta.serviceUrl}/object/location/${locationId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(resp.data.response.location);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getByName(locationName: string): Promise<LocationModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetLocationResponse>(`${meta.serviceUrl}/object/location`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }, params: {
                        name: locationName
                    }
                });

                resolve(resp.data.response.location);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getAll(): Promise<LocationModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetAllLocationsResponse>(`${meta.serviceUrl}/object/location`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                let locations: LocationModel[] = [];
                resp.data.response.locations.forEach(x => locations.push(x.location));

                resolve(locations);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async updateById(locationId: number, locationName?: string, locationCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<LocationModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/location/${locationId}`, {
                    location: {
                        locationName: locationName,
                        locationCode: locationCode,
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

    public async updateByName(locationName: string, newLocationName?: string, locationCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/location?name=${locationName}`, {
                    location: {
                        locationName: newLocationName,
                        locationCode: locationCode,
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

    public async upsert(locationName: string, locationCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<LocationModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/location?upsert=true`, {
                    location: {
                        locationName: locationName,
                        locationCode: locationCode,
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
