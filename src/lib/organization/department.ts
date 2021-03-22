import axios, { AxiosError } from 'axios';
import { Client } from '../client';
import { Department as DepartmentModel } from '../../models/department';
import { GetAllDepartmentsResponse } from '../../responses/department/get_all_departments_response';
import { GetDepartmentResponse } from '../../responses/department/get_department_response';
import { ActionResponse } from '../../responses/action_response';
import { GenericResponse } from '../../responses/generic_response';
import { ErrorResponse } from '../../responses/error_response';

export class Department {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async create(departmentName: string, departmentCode?: string, description?: string, associatedUsers?: number[], requisitionApprovers?: number[]): Promise<DepartmentModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/department`, {
                    department: {
                        departmentName: departmentName,
                        departmentCode: departmentCode,
                        description: description,
                        associatedUsers: associatedUsers,
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

    public async delete(departmentId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                await axios.delete<GenericResponse>(`${meta.serviceUrl}/object/department/${departmentId}`, {
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

    public async getById(departmentId: number): Promise<DepartmentModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetDepartmentResponse>(`${meta.serviceUrl}/object/department/${departmentId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(resp.data.response.department);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getByName(departmentName: string): Promise<DepartmentModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetDepartmentResponse>(`${meta.serviceUrl}/object/department`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }, params: {
                        name: departmentName
                    }
                });

                resolve(resp.data.response.department);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getAll(): Promise<DepartmentModel[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetAllDepartmentsResponse>(`${meta.serviceUrl}/object/department`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                let departments: DepartmentModel[] = [];
                resp.data.response.departments.forEach(x => departments.push(x.department));

                resolve(departments);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async updateById(departmentId: number, departmentName?: string, departmentCode?: string, description?: string, associatedUsers?: number[], requisitionApprovers?: number[]): Promise<DepartmentModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/department/${departmentId}`, {
                    department: {
                        departmentName: departmentName,
                        departmentCode: departmentCode,
                        description: description,
                        associatedUsers: associatedUsers,
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

    public async updateByName(departmentName: string, newDepartmentName?: string, departmentCode?: string, description?: string, associatedUsers?: number[], requisitionApprovers?: number[]) {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<ActionResponse>(`${meta.serviceUrl}/object/department?name=${departmentName}`, {
                    department: {
                        departmentName: newDepartmentName,
                        departmentCode: departmentCode,
                        description: description,
                        associatedUsers: associatedUsers,
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

    public async upsert(departmentName: string, departmentCode?: string, description?: string, associatedUsers?: number[], requisitionApprovers?: number[]): Promise<DepartmentModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<ActionResponse>(`${meta.serviceUrl}/object/department?upsert=true`, {
                    department: {
                        departmentName: departmentName,
                        departmentCode: departmentCode,
                        description: description,
                        associatedUsers: associatedUsers,
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
