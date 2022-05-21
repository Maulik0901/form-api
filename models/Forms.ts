import { IForms } from '../interfaces/models/forms';
import mongoose from '../config/db';

export const FormsSchema = new mongoose.Schema<IForms>({
	name: { 
        type: String 
    },
    status: {
        type: Number,
        default: 1
    },
    type: { 
        type: String 
    },
    field: { 
        type: String 
    },       
    step: { 
        type: Number,
        default: 1
    },
    order: { 
        type: Number,
        default: 1
    },
    companyId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    createdAt: Number,
    updatedAt: Number,

}, {
    timestamps: true
});

const Forms = mongoose.model<IForms>('Forms', FormsSchema,"Forms");

export default Forms;