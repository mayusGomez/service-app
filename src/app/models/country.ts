enum CountriesId {
    COL,
    GTM
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
