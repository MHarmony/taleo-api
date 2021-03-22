import { TaleoConfig } from '../models/taleo_config';
import { Client } from '../lib/client';
import { Organization } from '../lib/organization/organization';
import { User } from './user';
import { Employee } from './employee/employee';

export class Taleo {
    public employee: Employee;
    public organization: Organization;
    public user: User;

    private client: Client;
    private companyCode: string;
    private username: string;
    private password: string;

    public constructor(config: TaleoConfig) {
        this.companyCode = config.companyCode;
        this.username = config.username;
        this.password = config.password;
        this.client = new Client(this.companyCode, this.username, this.password);
        this.organization = new Organization(this.client);
        this.user = new User(this.client);
        this.employee = new Employee(this.client);
    }
}
