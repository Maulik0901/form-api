import { Router } from 'express';
import RoleController from '../../controller/v1/role.controller';

const router = Router();

router.post('/', RoleController.roleInsertValidation, RoleController.create);

export default router;