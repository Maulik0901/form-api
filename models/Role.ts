import { IRole } from '../interfaces/models/role';
import mongoose from '../config/db';

export const RoleSchema = new mongoose.Schema<IRole>({
	name: { 
        type: String 
    },
    status: {
        type: Number,
        default: 1
    }

}, {
	timestamps: true
});

const Role = mongoose.model<IRole>('Role', RoleSchema);

export default Role;