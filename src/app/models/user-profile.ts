export enum Gender {
    male = 0,
    female = 1,
    other = 2
}

export enum PaymentType {
    credict_card=0
}

export interface PaymentMethod{
    type: PaymentType;
    last_numbers: number;
    token: string;
}

export interface Adress{
    country: string;  // ISO3 COuntry code
    state: string;
    citi: string;
    description: string;
    citi_zone: string;
    geolocation: object;
    name: string;
}


export interface UserProfile {
    id: string;
    email: string;
    name: string;
    phone?: {
        country_code: string;
        number: string;
    },
    gender?: Gender;

    starts?: number;                     // Starts assign by thechnical staff
    completed_services?: number;         // Services completed with payment
    current_services_quote?: number;     // Services currently with quote
    completed_services_percent?: number; // Percentage of services with payment
    
    // starts: number;
    // completed_services: number;
    // current_services_quote: number;
    // quote_respond_percent: number;

    address?: Adress[];
    payment_methods?: PaymentMethod[];
}