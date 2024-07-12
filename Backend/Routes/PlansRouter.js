import { Router } from 'express';
import { createPlan, getPlans, getPlanById, updatePlan, deletePlan } from '../Controllers/PlansController.js';

const router = Router();

router.post('/', createPlan);
router.get('/', getPlans);
router.get('/:id', getPlanById);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
