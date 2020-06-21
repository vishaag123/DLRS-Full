

    export interface TestDetail {
        id: any;
        name: string;
        description: string;
        cost: any;
        imageUrl: string;
    }

    export interface PaymentDetail {
        id?: any;
        amount?: any;
        type: string;
        status: string;
        date: string;
    }

    export interface ReportDetail {
        id?: any;
        result: string;
        date: string;
    }

    export interface AppointmentDetail {
        appointmentId: number;
        amount: number;
        status: string;
        date: string;
        testDetails: TestDetail[];
        paymentDetails: PaymentDetail[];
        reportDetails: ReportDetail[];
    }

    export interface UserAppointment {
        userId: number;
        name: string;
        email: string;
        password: string;
        contact: string;
        address: string;
        role: string;
        appointmentDetails: AppointmentDetail[];
    }



