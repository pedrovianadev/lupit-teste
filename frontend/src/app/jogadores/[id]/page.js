"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function EditarJogador({ params }) {
  const { id } = params;
  const [player, setPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const response = await fetch(`/api/players/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar o jogador');
        }
        const data = await response.json();
        setPlayer(data);
      } catch (error) {
        setError(error.message);
      }
    }

    async function fetchTeams() {
      try {
        const response = await fetch('/api/teams');
        if (!response.ok) {
          throw new Error('Erro ao carregar os times');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchPlayer();
    fetchTeams();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const teamId = formData.get('team');
    const age = parseInt(formData.get('age'), 10);

    if (!name || !teamId || isNaN(age)) {
      Swal.fire('Erro!', 'Todos os campos são obrigatórios.', 'error');
      return;
    }

    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, teamId, age }),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar o jogador');
      }
      Swal.fire('Sucesso', 'Jogador atualizado com sucesso', 'success');
      window.location.href = '/';
    } catch (error) {
      Swal.fire('Erro!', 'Não conseguimos atualizar o jogador, tente novamente mais tarde.', 'error');
    }
  };

  return (
    <div>
      <h1>Editar Jogador</h1>
      {error && <p>{error}</p>}
      {player ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nome do Jogador:</label>
          <input type="text" id="name" name="name" defaultValue={player.name} />

          <label htmlFor="team">Time:</label>
          <select id="team" name="team" defaultValue={player.team.id}>
            {teams.map(team => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <label htmlFor="age">Idade:</label>
          <input type="number" id="age" name="age" defaultValue={player.age} />

          <button type="submit">Salvar</button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}