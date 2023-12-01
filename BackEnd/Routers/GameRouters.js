import express from "express";
import { createGame, getAllGames, makeMove } from "../controllers/GameController.js";


const router = express.Router();

router.post("/create/game", createGame);
router.put("/game/:gameId", makeMove);
router.get("/all/games", getAllGames);

export default router;
