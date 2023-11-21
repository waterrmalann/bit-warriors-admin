import express from 'express';
import authController from '../controllers/authController.js';
const router = express.Router();

router.get('/', authController.GetAuth);
router.post('/', authController.PostLogin);
router.get('/logout', authController.GetLogout);

export default router;