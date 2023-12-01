

import Player from "../Models/PlayerSchema.js";
import PlayerChoice from "../Models/PlayerChoiceSchema.js";
import Game from "../Models/GameSchema.js";

const determineWinner = (player1Choice, player2Choice) => {
  if (player1Choice === player2Choice) {
    return "tie";
  }

  if (
    (player1Choice === "stone" && player2Choice === "scissors") ||
    (player1Choice === "scissors" && player2Choice === "paper") ||
    (player1Choice === "paper" && player2Choice === "stone")
  ) {
    return "player1";
  }

  return "player2";
};

export const createGame = async (req, res) => {
  try {
    const { player1Name, player2Name } = req.body;

    const player1 = new Player({ name: player1Name, score: 0 });
    const player2 = new Player({ name: player2Name, score: 0 });

    await Promise.all([player1.save(), player2.save()]);

    const newGame = new Game({
      player1: player1._id,
      player2: player2._id,
      rounds: [],
    });

    await newGame.save();

    res.json({ gameId: newGame._id });
  } catch (error) {
    console.error("Error creating a new game:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const makeMove = async (req, res) => {
  try {
    const { player1Choice, player2Choice } = req.body;
    const gameId = req.params.gameId;

    const game = await Game.findById(gameId).populate(
      "player1 player2 player1Choice player2Choice"
    );

    const winner = determineWinner(player1Choice.choice, player2Choice.choice);

    
    const newPlayer1Choice = new PlayerChoice({
      playerId: game.player1._id,
      choice: player1Choice.choice,
    });

    const newPlayer2Choice = new PlayerChoice({
      playerId: game.player2._id,
      choice: player2Choice.choice,
    });

    await Promise.all([newPlayer1Choice.save(), newPlayer2Choice.save()]);

    
    game.rounds.push({
      player1Choice: newPlayer1Choice._id,
      player2Choice: newPlayer2Choice._id,
      winner,
    });

  
    game.player1Choice = newPlayer1Choice._id;
    game.player2Choice = newPlayer2Choice._id;

    if (winner === "player1") {
      game.player1.score += 1;
    } else if (winner === "player2") {
      game.player2.score += 1;
    }

    await game.save();

  
    if (game.player1.score === 6 || game.player2.score === 6) {
      res.json({
        winner:
          game.player1.score === 6 ? game.player1.name : game.player2.name,
        player1Score: game.player1.score,
        player2Score: game.player2.score,
        player1Choice: player1Choice.choice,
        player2Choice: player2Choice.choice,
        rounds: game.rounds,
      });
    } else {
      res.json({
        winner,
        player1Score: game.player1.score,
        player2Score: game.player2.score,
        player1Choice: player1Choice.choice,
        player2Choice: player2Choice.choice,
        rounds: game.rounds,
      });
    }
  } catch (error) {
    console.error("Error making a move:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllGames = async (req, res) => {
  try {
    const games = await Game.find().populate(
      "player1 player2 player1Choice player2Choice"
    );
    res.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
