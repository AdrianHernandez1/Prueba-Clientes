export interface InterfazEstados {
    states: State[];
}

export interface State {
    idState: number;
    name:    string;
    status:  boolean;
}