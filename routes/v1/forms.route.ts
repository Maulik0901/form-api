import { Router } from 'express';
import FormController from '../../controller/v1/forms.controller';
import AuthMiddelware from "../../middleware/basic.auth";

const router = Router();

router.get('/',AuthMiddelware.basicAuthUser, FormController.get);
router.post('/', AuthMiddelware.basicAuthUser,FormController.formInsertValidation, FormController.create);
router.put('/', AuthMiddelware.basicAuthUser,FormController.formUpdateValidation, FormController.update);
router.delete("/:id",AuthMiddelware.basicAuthUser,FormController.delete)

export default router;