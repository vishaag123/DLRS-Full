export class TestDetail {
    id: number;
}



export class AppointmentDetail {
    amount: number;
    date: string;
    testDetails: TestDetail[];
}



export class AppointmentCreate {
    userId: number;
    appointmentDetails: AppointmentDetail[];
}