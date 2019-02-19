export interface City {
    id: string;      
    order: number;           
    name: string;
    country_id: string;         // ISO2
    country_name: string;
    subdivision_id: string; 
    subdivision_name: string;
    center_point: {
        lat: number,
        lng: number
    }
}