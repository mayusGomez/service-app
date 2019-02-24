export interface JobCategory {
    id: string,
    name: {
        es: string
    },
    card_image?: string,
}


export interface JobType {
    id: string,
    id_Category: string,
    name: {
        es: string
    }
}
