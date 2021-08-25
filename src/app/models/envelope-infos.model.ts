export interface EnvelopeInfosModel {
    type: 'mail' | 'link';
    from: string;
    message: string;
}

export interface MailInfosModel extends EnvelopeInfosModel {
    subject: string;
    to: string[];
}

export interface LinkInfosModel extends EnvelopeInfosModel {
    transferName: string;
}