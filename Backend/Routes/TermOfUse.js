import { Router } from 'express';
import { getTermsOfUse, updateTermsOfUse } from '../Controllers/TermsOfUseController.js';

const router = Router();

// Route to get the latest terms of use
router.get('/', getTermsOfUse);

// Route to update the terms of use
router.put('/', updateTermsOfUse);

export default router;
