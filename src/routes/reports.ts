import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

router.get('/test', function(req: Request, res: Response) {
    res.status(200).json({status:'success',meassage:'Working fine!'});

})

export default router;