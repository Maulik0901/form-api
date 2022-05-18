import { Router } from 'express';
import CompanyController from '../../controller/v1/company.controller';

const router = Router();

router.get('/', CompanyController.get);
router.post('/', CompanyController.companyInsertValidation, CompanyController.create);
router.put('/', CompanyController.companyUpdateValidation, CompanyController.update);
router.delete("/:id",CompanyController.delete)
export default router;