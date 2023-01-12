export interface InterfazMunicipios {
    municipalities: Municipality[];
}

export interface Municipality {
    idMunicipality:       number;
    name:                 string;
    status:               boolean;
    idState_Municipality: number;
}
