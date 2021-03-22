import axios, { AxiosError } from 'axios';
import { Client } from '../client';
import { Division as DivisionModel } from '../../models/division';
import { GetAllDivisionsResponse } from '../../responses/division/get_all_divisions_response';
import { GetDivisionResponse } from '../../responses/division/get_division_response';
import { ActionResponse } from '../../responses/action_response';
import { GenericResponse } from '../../responses/generic_response';
import { ErrorResponse } from '../../responses/error_response';

export class Division {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async create(divisionName: string, divisionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<DivisionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/division`, {
                    division: {
                        divisionName: divisionName,
                        divisionCode: divisionCode,
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

    public async delete(divisionId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                await axios.delete<GenericResponse>(`${meta.serviceUrl}/object/division/${divisionId}`, {
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

    public async getById(divisionId: number): Promise<DivisionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetDivisionResponse>(`${meta.serviceUrl}/object/division/${divisionId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(resp.data.response.division);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getByName(divisionName: string): Promise<DivisionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetDivisionResponse>(`${meta.serviceUrl}/object/division`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }, params: {
                        name: divisionName
                    }
                });

                resolve(resp.data.response.division);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getAll(): Promise<DivisionModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetAllDivisionsResponse>(`${meta.serviceUrl}/object/division`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                let divisions: DivisionModel[] = [];
                resp.data.response.divisions.forEach(x => divisions.push(x.division));

                resolve(divisions);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async updateById(divisionId: number, divisionName?: string, divisionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<DivisionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/division/${divisionId}`, {
                    division: {
                        divisionName: divisionName,
                        divisionCode: divisionCode,
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

    public async updateByName(divisionName: string, newDivisionName?: string, divisionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/division?name=${divisionName}`, {
                    division: {
                        divisionName: newDivisionName,
                        divisionCode: divisionCode,
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

    public async upsert(divisionName: string, divisionCode?: string, description?: string, associatedUsers?: number[], associatedDepartments?: number[], requisitionApprovers?: number[]): Promise<DivisionModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/division?upsert=true`, {
                    division: {
                        divisionName: divisionName,
                        divisionCode: divisionCode,
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
