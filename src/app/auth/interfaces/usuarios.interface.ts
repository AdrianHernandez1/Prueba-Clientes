// Generated by https://quicktype.io

export interface InterfazUsuario {
    users: User[];
}

export interface User {
    idUser:      number;
    name:        string;
    password:    string;
    email:       string;
    token:       null;
    status:      boolean;
    idRole_User: number;
}
