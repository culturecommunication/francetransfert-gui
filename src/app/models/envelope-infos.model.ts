export interface EnvelopeInfosModel {
    type?: 'mail' | 'link';
    from?: string;
    message?: string;
    subject?: string;
    cguCheck?: boolean;
    parameters?: ParametersModel;
}

export interface MailInfosModel extends EnvelopeInfosModel {
    subject?: string;
    to?: string[];
}

export interface LinkInfosModel extends EnvelopeInfosModel {
    subject?: string;
    to?: string[];
}

export interface ParametersModel {
    expiryDays: number;
    password: string;
}
