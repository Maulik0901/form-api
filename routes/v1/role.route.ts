import { Router } from 'express';
import RoleController from '../../controller/v1/role.controller';

const router = Router();

router.get('/', RoleController.get);
router.post('/', RoleController.roleInsertValidation, RoleController.create);
router.put('/', RoleController.roleUpdateValidation, RoleController.update);
router.delete("/:id",RoleController.delete)
export default router;