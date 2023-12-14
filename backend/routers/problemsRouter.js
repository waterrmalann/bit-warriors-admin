import express from 'express';
import problemsController from '../controllers/problemsController.js';
const router = express.Router();

router.get('/', problemsController.GetProblems);

router.post('/', problemsController.PostProblem);

router.get('/:problemId', problemsController.GetProblem);

router.put('/:problemId', problemsController.PutProblem);

router.delete('/:problemId', problemsController.DeleteProblem);

router.get('/:problemId/tests', problemsController.GetTestCases);
router.post('/:problemId/tests', problemsController.PostTestCase);
router.put('/:problemId/tests/:testId', problemsController.PutTestCases);

// router.get('/', problemsController)

export default router;