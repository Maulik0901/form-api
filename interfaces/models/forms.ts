import { ObjectId } from "mongodb";


export interface IForms {
    name: string;
    type: string;
    field: string;
    status: number;    
    step: number;
    order: number;
    companyId: ObjectId;
    createdAt?: number;
    updatedAt?: number;
}

export default IForms;