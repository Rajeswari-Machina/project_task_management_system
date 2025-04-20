import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`https://backend-service-m0q3.onrender.com/api/projects/`, {
          withCredentials: true,
        });
        setProjects(response.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Something went wrong.');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-emerald-600 mb-8 text-center">All Projects</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="p-6 bg-white shadow-lg rounded-xl border-2 border-emerald-600"
              >
                <h2 className="text-xl font-semibold text-emerald-700">{project.title}</h2>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Created By: {project.createdBy?.name || 'Unknown'}
                </p>
                <p className="text-sm text-gray-500">
                  Created At: {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/projects/${project._id}`}
                  className="mt-4 inline-block text-white bg-emerald-600 hover:bg-emerald-700 font-medium py-2 px-4 rounded-full"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
