import { ListarGames, InserirGames } from "../controllers/gamesController.js";
import { Router } from "express";

const router = Router();

router.get('/games', ListarGames);
router.post('/games', InserirGames);

export default router;