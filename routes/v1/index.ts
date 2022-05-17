import { Express,Router } from 'express';
import auth from "./user.route";

const router = Router();

router.use('/auth',auth);


export default router;