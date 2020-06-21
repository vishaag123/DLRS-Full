import { Timestamp } from 'rxjs/internal/operators/timestamp';

export interface IAppointmentTestResponse{
    id:number;
    appointmentId:number,
    testId:number,
    userId:number,
    name:String,
    date:Timestamp<Date>
}