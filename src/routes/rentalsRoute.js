import { ListaRentals, InserirRentals, RetornoRentals } from "../controllers/rentalsControllers.js";
import { Router } from "express";

const router = Router();

router.get('/rentals', ListaRentals);
router.post('/rentals', InserirRentals);
router.post(' /rentals/:id/return', RetornoRentals);

export default router;