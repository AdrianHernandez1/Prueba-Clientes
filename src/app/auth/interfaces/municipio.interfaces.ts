export interface InterfazMunicipios {
    municipios: Municipio[];
}

export interface Municipio {
    id:              number;
    nombreMunicipio: string;
    fkEstado:        number;
}