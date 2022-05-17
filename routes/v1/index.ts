import { Express,Router } from 'express';
import auth from "./user.route";
import role from "./role.route";
const router = Router();

router.use('/auth',auth);
router.use('/role',role);


export default router;