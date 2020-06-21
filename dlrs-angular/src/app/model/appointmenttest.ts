import {Test} from './test'
import { Timestamp } from 'rxjs/internal/operators/timestamp';



export class IAppointmentTest{
    appointmentId:number;
    userId:number;
    name:String;
    date:Timestamp<Date>;
    testList:Test[]
}