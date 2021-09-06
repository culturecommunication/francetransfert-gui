export interface EnvelopeInfosModel {
    type: 'mail' | 'link';
    from: string;
    message: string;
}

export interface MailInfosModel extends EnvelopeInfosModel {
    subject?: string;
    to?: string[];
    parameters?: ParametersModel;
}

export interface LinkInfosModel extends EnvelopeInfosModel {
    subject?: string;
    to?: string[];
    parameters?: ParametersModel;
}

export interface ParametersModel {
    expiryDays: number;
    password: string;
}