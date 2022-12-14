import { ListarCategorias, InserirCategorias } from "../controllers/categoriesController.js";
import { Router } from "express";

const router = Router();

router.get('/categories', ListarCategorias);
router.post('/categories', InserirCategorias);

export default router;