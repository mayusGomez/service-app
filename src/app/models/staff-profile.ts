import { Gender, Address } from './generic';


export interface StaffProfile {
    readonly id: string;
    email: string;
    first_name: string;
    last_name: string;
    admin?: boolean;
    phone: {
        country_code: string;
        number: string;
    },
    gender: Gender;

    starts: number;                     // Starts assign by thechnical staff
    completed_services: number;         // Services completed with payment
    current_services_quote: number;     // Services currently with quote
    completed_services_percent: number; // Percentage of services with payment
    
    // starts: number;
    // completed_services: number;
    // current_services_quote: number;
    // quote_respond_percent: number;

    address: Address;
}
