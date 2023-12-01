

import React, { useEffect, useState } from 'react';

const GameDetailsPage = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:4000/api/all/games')
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(error => console.error('Error fetching game details:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Game Details</h1>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>Winner</th>

          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game._id}>
              <td>{game._id}</td>
              <td>{game.player1.name}</td>
              <td>{game.player2.name}</td>
              <td>{game.player1.score === 6 ? game.player1.name : game.player2.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameDetailsPage;
