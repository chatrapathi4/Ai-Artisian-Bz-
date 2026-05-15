import { Router } from 'express';
import { googleLogin } from '../controllers/oauthController.js';

const oauthRouter = Router();

oauthRouter.post('/google', googleLogin);

export default oauthRouter;
