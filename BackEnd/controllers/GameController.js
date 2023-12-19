
import express from "express"
import pool from "../Database/dbconnect.js";

const router = express.Router();

router.post("/createGame", async (req, res) => {
  try {
    const { player1Name, player2Name } = req.body;
    const result = await pool.query(
      "INSERT INTO games (player1_name, player2_name, player1_score, player2_score, winner_name) VALUES ($1, $2, 0, 0, null) RETURNING *",
      [player1Name, player2Name]
    );
    res.status(200).json({ success: true, game: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


router.get("/getAllGames", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM games");
    const games = result.rows;
    res.status(200).json({ success: true, games });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


router.post("/makeMove/:gameId", async (req, res) => {
  try {
    const { move, player } = req.body;
    const { gameId } = req.params;

    const game = await pool.query("SELECT * FROM games WHERE id = $1", [
      gameId,
    ]);

    if (game.rows.length === 0) {
      res.status(404).json({ success: false, error: "Game not found" });
      return;
    }

    const currentPlayer = player === 1 ? "player1" : "player2";

    const result = await pool.query(
      `UPDATE games SET ${currentPlayer}_score = ${currentPlayer}_score + 1 WHERE id = $1 RETURNING *`,
      [gameId]
    );

    const updatedGame = result.rows[0];

    if (updatedGame.player1_score === 6 || updatedGame.player2_score === 6) {
      const winnerName =
        updatedGame.player1_score === 6
          ? updatedGame.player1_name
          : updatedGame.player2_name;
      await pool.query(
        "UPDATE games SET winner_name = $1, status = $2 WHERE id = $3",
        [winnerName, "completed", gameId]
      );
    }

    res.status(200).json({ success: true, game: updatedGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
