import express, { Router } from 'express';
import validate from '../../modules/validate/validate.middleware';
import { MessageValidator, MessagingControler } from '../../modules/messaging';

const router: Router = express.Router();

router.post('/post', validate(MessageValidator.postMessage), MessagingControler.postMessage);
router.post('/fetchAllUserMessages', validate(MessageValidator.getAllMessagesRequest), MessagingControler.fetchAllUserMessages);

export default router;