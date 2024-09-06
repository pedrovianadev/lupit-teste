import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:3001/teams';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          console.error('Failed to fetch teams');
          Swal.fire({
            title: 'Erro!',
            text: 'Não conseguimos carregar os times, tente novamente mais tarde.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        Swal.fire({
          title: 'Erro!',
          text: 'Não conseguimos carregar os times, tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Teams</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.length ? (
            teams.map(team => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name}</td>
                <td>{new Date(team.createdAt).toLocaleString()}</td>
                <td>
                  <a href={`/teams/${team.id}`}>Edit</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No teams found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}