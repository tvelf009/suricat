export interface SearchResult{
    display_name?: string
    lat?: number
    lon?: number
}

export interface ResponceCompany{
    id?: number
    company_name: string
    company_logo: string
}

export interface ResponceBranches{
    id?: number
    address: string
    id_company: number
    lat: number
    lon: number
    logo?:string
}

export interface ResponceSearch{
    id?: number
    address: string
    id_company: number
    lat: number
    lon: number
    company_name: string
    count: number
    position_name:string
    company_logo: string
    salary: string
}

export interface ResponceVacancy{
    id_position: number
    id_branch: number
    count: number
    salary: number
}