export interface Contact {
    id: string;
    name: string;
    msg: string;
    mail: string;
    grade: string;
}
export interface App {
    id: string;
    title: string;
    userLogin: boolean;
    snackMsg: string;
    snackOpen: boolean;
    contacts: Contact[]
}