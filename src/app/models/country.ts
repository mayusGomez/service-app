enum CountriesId {
    COL,
    GTM
}

export interface Citi {
    id: string;      
    order: number;           
    name: string;
    country_id: string;         // ISO2
    subdivision_id: string; 
}

export interface Subdivision{
    id: string;                 // ISO2 country code + Subdivision CODE (https://en.wikipedia.org/wiki/ISO_3166-2:GT)
    country_id: string;         // ISO2 country code
    name: string;
}

export interface Country {
    id: CountriesId;            // ISO2
    alpha3: string;             // ISO3
    order: number;
    name: string;
    phone_code: string;         // E164
    currency_code: string;  
    currency_decimal: number;       
    time_zone_capital: string;  
}
