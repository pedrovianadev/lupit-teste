"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

// Certifique-se de que a URL está correta
const API_URL = 'http://localhost:3001/players'; 

export default function HomePage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setPlayers(data);
        } else {
          console.error('Failed to fetch players');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Players</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Team</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.length ? (
            players.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.team.name}</td>
                <td>{new Date(player.createdAt).toLocaleString()}</td>
                <td>
                  {/* Adicione links para editar e remover jogadores */}
                  <a href={`/players/${player.id}`}>Edit</a>
                  <button onClick={() => handleDelete(player.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No players found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  function handleDelete(playerId) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_URL}/${playerId}`, {
            method: 'DELETE',
          });
          setPlayers(players.filter(player => player.id !== playerId));
          Swal.fire('Deleted!', 'Player has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'There was an error deleting the player.', 'error');
        }
      }
    });
  }
}