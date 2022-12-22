
// Generated by https://quicktype.io

export interface InterfazCliente {
    clientes: Cliente[];
}

export interface Cliente {
    id?:           number;
    nombre?:       string;
    apellidoP?:    string;
    apellidoM?:    string;
    telefono?:     string;
    puesto?:       string;
    sucursal?:     string;
    rfc?:          string;
    nombreFiscal?: string;
    latitud?:      string;
    longitud?:     string;
    fkEstado?:     number;
    fkMunicipio?:  number;
    codigoPostal?: string;
    colonia?:      string;
    referencia?:   string;
    estatus?:      number;
}

