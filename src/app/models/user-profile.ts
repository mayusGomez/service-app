import { PaymentMethod, Gender, Address } from './generic';

export interface UserProfile {
    id: string;
    // Basic Data
    email: string;
    first_name: string;
    last_name: string;
    gender: Gender;

    // Country Phone
    country_phone?: string;       // ISO3 for country
    country_code_phone?: string;  // ISO country E164
    phone_number?: string;

    // Operation Data
    starts?: number;                     // Starts assign by thechnical staff
    completed_services?: number;         // Services completed with payment
    current_services_quote?: number;     // Services currently with quote
    completed_services_percent?: number; // Percentage of services with payment

    // starts: number;
    // completed_services: number;
    // current_services_quote: number;
    // quote_respond_percent: number;

    // Complementary Data
    address?: Address[];
    payment_methods?: PaymentMethod[];
}
