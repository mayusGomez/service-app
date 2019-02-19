export interface ResponseObject {
    object: any,
    errCode: number,
    errMsg: string
}

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

export interface Address {
    country_id: string;  // ISO3 COuntry code
    country_name: string;
    subdivision_id: string;
    subdivision_name: string;
    citi_id: string;
    citi_name: string;
    description?: string;
    detail?: string;
    citi_zone?: string;
    geolocation?: {
        lat: number,
        lng: number
    };
    name?: string;
}
