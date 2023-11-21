import express from 'express';
import problemsController from '../controllers/problemsController.js';
const router = express.Router();

router.get('/', problemsController.GetProblems);

router.post('/', problemsController.PostProblem);

router.get('/:problemId', problemsController.GetProblem);

router.put('/:problemId', problemsController.PutProblem);

router.delete('/:problemId', problemsController.DeleteProblem);

export default router;