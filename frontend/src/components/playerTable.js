import { useEffect, useState } from 'react';
import { getPlayers, deletePlayer } from '../services/api';
import Swal from 'sweetalert2';

export default function PlayerTable() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data } = await getPlayers();
      setPlayers(data);
    } catch (error) {
      Swal.fire('Erro!', 'Erro ao carregar jogadores', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Remover o jogador é uma ação irreversível.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    });

    if (confirm.isConfirmed) {
      try {
        await deletePlayer(id);
        fetchPlayers();
        Swal.fire('Sucesso!', 'Jogador removido', 'success');
      } catch (error) {
        Swal.fire('Erro!', 'Erro ao remover jogador', 'error');
      }
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Time</th>
          <th>Data de Criação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {players.length === 0 ? (
          <tr>
            <td colSpan="5">Não existe nenhum jogador cadastrado</td>
          </tr>
        ) : (
          players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.team.name}</td>
              <td>{new Date(player.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(player.id)}>Remover</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
