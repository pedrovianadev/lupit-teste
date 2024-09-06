"use client";

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function NovoJogador() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('http://localhost:3001/api/teams'); // Ajuste para a porta correta
        if (!response.ok) {
          throw new Error('Erro ao carregar os times');
        }
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Adicionar Jogador</h1>
      {error && <p>{error}</p>}
      <form>
        <label htmlFor="name">Nome do Jogador:</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="team">Time:</label>
        <select id="team" name="team">
          <option value="">Selecione um time</option>
          {teams.map(team => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <label htmlFor="age">Idade:</label>
        <input type="number" id="age" name="age" />

        <button type="submit">Salvar Jogador</button>
      </form>
    </div>
  );
}