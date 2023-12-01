import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  player1Choice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlayerChoice",
  },
  player2Choice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlayerChoice",
  },
  rounds: [
    {
      player1Choice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlayerChoice",
      },
      player2Choice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PlayerChoice",
      },
      winner: String,
    },
  ],
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
