import axios, { AxiosError } from 'axios';
import { Client } from './client';
import { User as UserModel, CreateUser, UpsertUser } from '../models/user';
import { UserActionResponse } from '../responses/user/user_action_response';
import { GenericResponse } from '../responses/generic_response';
import { ErrorResponse } from '../responses/error_response';
import { GetUserResponse } from '../responses/user/get_user_response';
import { GetAllUsersResponse } from '../responses/user/get_all_users_response';
import { Pagination } from '../models/pagination';

export class User {
    private client: Client;
    private currentUsers: UserModel[];
    private pagination: Pagination;

    constructor(client: Client) {
        this.client = client;
    }

    public async create(user: CreateUser): Promise<UserModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<UserActionResponse>(`${meta.serviceUrl}/object/user`, {
                    user: user
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.userId));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async delete(userId: number): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                await axios.delete<GenericResponse>(`${meta.serviceUrl}/object/user/${userId}`, {
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

    public async getById(userId: number): Promise<UserModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.get<GetUserResponse>(`${meta.serviceUrl}/object/user/${userId}`, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(resp.data.response.user);
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async getAll(): Promise<UserModel[]> {
        try {
            const meta = await this.client.login();
            const resp = await axios.get<GetAllUsersResponse>(this.pagination?.next ?? `${meta.serviceUrl}/object/user/search`, {
                headers: {
                    Cookie: `authToken=${meta.authToken}`
                }
            });

            let users: UserModel[] = this.currentUsers || [];
            resp.data.response.searchResults.forEach(x => users.push(x.user));

            if (resp.data.response.pagination.next) {
                this.currentUsers = users;
                this.pagination = resp.data.response.pagination;
                return this.getAll();
            } else {
                this.currentUsers = [];
                this.pagination = null;

                return new Promise(resolve => resolve(users));
            }
        } catch (err) {
            const realErr = err as AxiosError<ErrorResponse>;
            throw (realErr.response.data);
        } finally {
            this.client.logout();
        }
    }

    public async update(userId: number, user: CreateUser): Promise<UserModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.put<UserActionResponse>(`${meta.serviceUrl}/object/user/${userId}`, {
                    user: user
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.userId));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }

    public async upsert(user: UpsertUser): Promise<UserModel> {
        return new Promise(async (resolve, reject) => {
            try {
                const meta = await this.client.login();
                const resp = await axios.post<UserActionResponse>(`${meta.serviceUrl}/object/user`, {
                    user: user
                }, {
                    headers: {
                        Cookie: `authToken=${meta.authToken}`
                    }
                });

                resolve(this.getById(resp.data.response.userId));
            } catch (err) {
                const realErr = err as AxiosError<ErrorResponse>;
                reject(realErr.response.data);
            } finally {
                this.client.logout();
            }
        });
    }
}
