import { Client } from '../client';
import { Department } from './department';
import { Division } from './division';
import { Region } from './region';
import { Location } from './location';

export class Organization {
    public department: Department;
    public division: Division;
    public location: Location;
    public region: Region;

    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.department = new Department(this.client);
        this.division = new Division(this.client);
        this.location = new Location(this.client);
        this.region = new Region(this.client);
    }
}
