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

export interface Address{
    country: string;  // ISO3 COuntry code
    state: string;
    citi: string;
    description: string;
    citi_zone: string;
    geolocation: object;
    name: string;
}
