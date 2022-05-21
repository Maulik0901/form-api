import { Express,Router } from 'express';
import auth from "./user.route";
import role from "./role.route";
import company from "./company.route";
import Form from "./forms.route";

const router = Router();

router.use('/auth',auth);
router.use('/role',role);
router.use('/company',company);
router.use('/form',Form);

export default router;