import mongoose from "mongoose";

const playerChoiceSchema = new mongoose.Schema({
  playerId: mongoose.Schema.Types.ObjectId,
  choice: String,
});

const PlayerChoice = mongoose.model("PlayerChoice", playerChoiceSchema);

export default PlayerChoice;
