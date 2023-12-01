

import React, { useState } from 'react';

const GamePlayPage = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Choice, setPlayer1Choice] = useState('stone');
  const [player2Choice, setPlayer2Choice] = useState('stone');
  const [gameResult, setGameResult] = useState({
    winner: null,
    player1Score: 0,
    player2Score: 0,
  });

  const playGame = async () => {
    
    const response = await fetch('http://localhost:4000/api/create/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player1Name, player2Name }),
    });

    const { gameId } = await response.json();

    
    const moveResponse = await fetch(`http://localhost:4000/api/game/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player1Choice: { choice: player1Choice }, player2Choice: { choice: player2Choice } }),
    });

    const result = await moveResponse.json();


    setGameResult(result);
  };

  const resetGame = () => {
    
    setPlayer1Name('');
    setPlayer2Name('');
    setPlayer1Choice('stone');
    setPlayer2Choice('stone');
    setGameResult({
      winner: null,
      player1Score: 0,
      player2Score: 0,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', textAlign: 'center' }}>
        <h1 className="mb-4">Stone Paper Scissors Game</h1>

        <form>
          
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="player1Name" className="form-label">Player 1 Name:</label>
            <input type="text" className="form-control" id="player1Name" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button type="button" className={`btn btn-outline-primary mr-2 ${player1Choice === 'stone' && 'scissors'}`} onClick={() => setPlayer1Choice('stone')}>
              Stone
            </button>
            <button type="button" className={`btn btn-outline-primary mr-2 ${player1Choice === 'paper' && 'stone'}`} onClick={() => setPlayer1Choice('paper')}>
              Paper
            </button>
            <button type="button" className={`btn btn-outline-primary ${player1Choice === 'scissors' && 'paper'}`} onClick={() => setPlayer1Choice('scissors')}>
              Scissors
            </button>
          </div>

        
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="player2Name" className="form-label">Player 2 Name:</label>
            <input type="text" className="form-control" id="player2Name" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button type="button" className={`btn btn-outline-primary mr-2 ${player2Choice === 'stone' && 'scissors'}`} onClick={() => setPlayer2Choice('stone')}>
              Stone
            </button>
            <button type="button" className={`btn btn-outline-primary mr-2 ${player2Choice === 'paper' && 'stone'}`} onClick={() => setPlayer2Choice('paper')}>
              Paper
            </button>
            <button type="button" className={`btn btn-outline-primary ${player2Choice === 'scissors' && 'paper'}`} onClick={() => setPlayer2Choice('scissors')}>
              Scissors
            </button>
          </div>

    
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <button type="button" className="btn btn-primary" onClick={playGame}>
              Play
            </button>
            <button type="button" className="btn btn-secondary ml-2" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </form>

    
        {gameResult && (
          <div className="mt-4">
            <h4>Game Result:</h4>
            <p>Winner: {gameResult.winner}</p>
            <p>{player1Name} Score: {gameResult.player1Score}</p>
            <p>{player2Name} Score: {gameResult.player2Score}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlayPage;