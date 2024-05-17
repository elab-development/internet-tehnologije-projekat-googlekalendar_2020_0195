import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './Admin.css';

// Registracija potrebnih elemenata
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/admin/dogadjaji', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const categories = response.data.map(category => category.naziv);
        const counts = response.data.map(category => category.dogadjaji_count);

        setCategoryData({
          labels: categories,
          datasets: [
            {
              label: 'Number of Events',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      } catch (error) {
        console.error('Failed to fetch category data', error);
      }
    };

    fetchUsers();
    fetchCategoryData();
  }, []);

  const makeAdmin = async (userId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(`http://127.0.0.1:8000/api/users/${userId}/make-admin`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the user list to reflect the new admin status
      setUsers(users.map(user => user.id === userId ? { ...user, admin: 1 } : user));
    } catch (error) {
      console.error('Failed to make user admin', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-container">
      <h1>Users</h1>
      <div className="chart-container">
        <Bar data={categoryData} />
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.admin ? 'Yes' : 'No'}</td>
              <td>
                {!user.admin && (
                  <button onClick={() => makeAdmin(user.id)}>Make Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
