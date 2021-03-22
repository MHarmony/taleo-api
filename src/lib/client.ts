import axios from 'axios';
import { ServiceUrlResponse } from '../responses/client/service_url_response';
import { LoginResponse } from '../responses/client/login_response';
import { GenericResponse } from '../responses/generic_response';
import { RequestMetadata } from '../models/request_metadata';

export class Client {
    public serviceUrl: string;

    private authToken: string;
    private companyCode: string;
    private serviceUrlBaseEndpoint = 'https://tbe.taleo.net/MANAGER/dispatcher/api/v1/serviceUrl';
    private username: string;
    private password: string;

    public constructor(companyCode: string, username: string, password: string) {
        this.companyCode = companyCode;
        this.username = username;
        this.password = password;
    }

    public async login(): Promise<RequestMetadata> {
        if (!this.serviceUrl) {
            this.serviceUrl = await this.getServiceUrl(this.companyCode);
            return this.login();
        } else {
            return new Promise(async (resolve, reject) => {
                try {
                    const resp = await axios.post<LoginResponse>(`${this.serviceUrl}/login`, null, {
                        params: {
                            orgCode: this.companyCode,
                            userName: this.username,
                            password: this.password
                        }
                    });

                    this.authToken = resp.data.response.authToken;
                    resolve({ authToken: resp.data.response.authToken, serviceUrl: this.serviceUrl });
                } catch (err) {
                    reject(err);
                }
            });
        }
    }

    public async logout(): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post<GenericResponse>(`${this.serviceUrl}/logout`, null, {
                    headers: {
                        Cookie: `authToken=${this.authToken}`
                    }
                });

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    private async getServiceUrl(companyCode: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                const resp = await axios.get<ServiceUrlResponse>(`${this.serviceUrlBaseEndpoint}/${companyCode}`);
                resolve(resp.data.response.URL.slice(0, -1));
            } catch (err) {
                reject(err);
            }
        });
    }
}
