import { Express,Router } from 'express';
import auth from "./user.route";
import role from "./role.route";
import company from "./company.route";

const router = Router();

router.use('/auth',auth);
router.use('/role',role);
router.use('/company',company);

export default router;