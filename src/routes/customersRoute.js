import { ListaCustomers, ListaCustomersPorId, InserirDadosDoCliente, AtualizarCustomers } from "../controllers/customersControllers.js";
import { Router } from "express";

const router = Router();

router.get('/customers', ListaCustomers);
router.get('/customers/:id', ListaCustomersPorId);
router.post('/customers', InserirDadosDoCliente);
router.put('/customers/:id', AtualizarCustomers);

export default router;