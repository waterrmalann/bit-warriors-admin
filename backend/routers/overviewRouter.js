import express from 'express';
import overviewController from '../controllers/overviewController.js';
const router = express.Router();

router.get('/status', overviewController.GetStatus);

export default router;