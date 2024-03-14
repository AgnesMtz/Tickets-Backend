import { Router } from 'express';
import {
    getBranchOffices,
    getBranchOffice,
    createBranchOffice
} from '../controllers/branchOffice.controller.js';

const router = Router();

router.get('/', getBranchOffices);

router.get('/:id', getBranchOffice);

router.post('/', createBranchOffice);

export default router;