import axios, { AxiosError } from 'axios';
import { Client } from '../client';
import { Employee as EmployeeModel, CreateEmployee, UpsertEmployee } from '../../models/employee';
import { EmployeeActionResponse } from '../../responses/employee/employee_action_response';
import { GenericResponse } from '../../responses/generic_response';
import { ErrorResponse } from '../../responses/error_response';
import { GetEmployeeResponse } from '../../responses/employee/get_employee_response';
import { GetAllEmployeesResponse } from '../../responses/employee/get_all_employees_response';
import { Pagination } from '../../models/pagination';

export class Employee {
    private client: Client;
    private currentEmployees: EmployeeModel[];
    private pagination: Pagination;

    constructor(client: Client) {
        this.client = client;
    }

    public async create(employee: CreateEmployee): Promise<EmployeeModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<EmployeeActionResponse>(`${meta.serviceUrl}/object/employee`, {
                    employee: employee
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.employeeId));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async delete(employeeId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                await axios.delete<GenericResponse>(`${meta.serviceUrl}/object/employee/${employeeId}`, {
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

    public async getById(employeeId: number): Promise<EmployeeModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetEmployeeResponse>(`${meta.serviceUrl}/object/employee/${employeeId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(resp.data.response.employee);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getAll(): Promise<EmployeeModel[]> {
        try {
            const meta = await this.client.login();
            const resp = await axios.get<GetAllEmployeesResponse>(this.pagination?.next ?? `${meta.serviceUrl}/object/employee/search`, {
                headers: {
                    Cookie: `authToken=${meta.authToken}`
                }
            });

            let employees: EmployeeModel[] = this.currentEmployees || [];
            resp.data.response.searchResults.forEach(x => employees.push(x.employee));

            if (resp.data.response.pagination.next) {
                this.currentEmployees = employees;
                this.pagination = resp.data.response.pagination;
                return this.getAll();
            } else {
                this.currentEmployees = [];
                this.pagination = null;

                return new Promise(resolve => resolve(employees));
            }
        } catch (err) {
            const realErr = err as AxiosError<ErrorResponse>;
            throw (realErr.response.data);
        } finally {
            this.client.logout();
        }
    }

    public async update(employeeId: number, employee: CreateEmployee): Promise<EmployeeModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<EmployeeActionResponse>(`${meta.serviceUrl}/object/employee/${employeeId}`, {
                    employee: employee
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.employeeId));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async upsert(employee: UpsertEmployee): Promise<EmployeeModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<EmployeeActionResponse>(`${meta.serviceUrl}/object/employee`, {
                    employee: employee
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.employeeId));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }
}
