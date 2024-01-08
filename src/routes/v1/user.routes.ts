import express, { Router } from 'express';
import { userController, userValidator } from '../../modules/user';
import validate from '../../modules/validate/validate.middleware';

const router: Router = express.Router();

router.post('/followUser', validate(userValidator.followedUser), userController.followUser);

export default router;