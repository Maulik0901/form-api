export class ErrorRespones {

    message!: string;
    status!: number;
    error!: any;

    constructor(status: number, message: string, error: any){
        this.status = status;
        this.message = message;
        this.error = error;
    }
}