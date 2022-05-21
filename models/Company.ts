import { ICompany } from '../interfaces/models/Company';
import mongoose from '../config/db';

export const CompanySchema = new mongoose.Schema<ICompany>({
	name: { 
        type: String 
    },
    status: {
        type: Number,
        default: 1
    },
    logo: {
        type: String
    },
    createdAt: Number,
    updatedAt: Number,

}, {
    timestamps: true
});

const Company = mongoose.model<ICompany>('Company', CompanySchema,"Company");

export default Company;