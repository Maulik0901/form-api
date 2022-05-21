import { IRole } from '../interfaces/models/role';
import mongoose from '../config/db';

export const RoleSchema = new mongoose.Schema<IRole>({
	name: { 
        type: String 
    },
    status: {
        type: Number,
        default: 1
    },
    createdAt: Number,
    updatedAt: Number,

}, {
    timestamps: true
});

const Role = mongoose.model<IRole>('Role', RoleSchema,"Role");

export default Role;