import { Express,Router } from 'express';

import v1 from "./v1/index";
const router = Router();
console.log("v1")
router.use('/v1',v1);


export default router;