import { Location } from "./Location";
import { Reporter } from "./Reporter";
import { v4 as uuidv4, stringify } from 'uuid';

export class Report {
    public reporter : Reporter;
    public location : Location;
    public visitedDate : Date;
    // public id : number;
    public id : string;

    constructor(
        reporter_name : string,
        phone_number : string,
        location_name : string,
        longitude : number,
        latitude : number,
        visitedDate : Date
    ){
        this.id = uuidv4();
        this.reporter = new Reporter(reporter_name, phone_number);
        this.location = new Location(location_name, longitude, latitude);
        this.visitedDate = visitedDate;
    }
}