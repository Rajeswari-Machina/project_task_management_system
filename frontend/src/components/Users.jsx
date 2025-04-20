import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://backend-service-m0q3.onrender.com/api/auth/users`,{withCredentials:true});
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">Users List</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-emerald-600 text-black">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
            </tr>
          </thead>text-black
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center text-black">
                <td className="border border-gray-300 text-black px-4 py-2">{user.name}</td>
                <td className="border border-gray-300  text-black px-4 py-2">{user.email}</td>
                <td className="border border-gray-300  text-black px-4 py-2 capitalize">{user.role}</td>
                <td className="border border-gray-300  text-black px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && !error && (
          <p className="text-gray-500 text-center mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Users;