export interface Vehicle {
    id: number;
    // model: {id: number, name: string};
    model: KeyValuePair;
    // make: {id: number, name: string};
    make: KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: string;
}

export interface SaveVehicle {
    id: number;
    // model: {id: number, name: string};
    modelId: number;
    // make: {id: number, name: string};
    makeId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;
}

export interface KeyValuePair {
    id: number;
    name: string;
}

export interface Contact {
    name: string;
    phone: string;
    email: string;
}
