import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/projects/${projectId}`,{withCredentials:true});
        setProject(response.data);
      } catch (err) {
        setError('Failed to fetch project details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return <div className="p-5 text-center text-emerald-600">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="border-2 border-emerald-600 rounded-xl p-10 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-600 mb-5">{project.title}</h1>
        <p className="text-lg text-gray-700 mb-4">{project.description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>
            <span className="font-semibold text-gray-700">Created By:</span>{' '}
            {project.createdBy?.name || 'Unknown'}
          </p>
          
        </div>
        <Link
          to={`/projects/${projectId}/tasks`}
          className="text-emerald-600 hover:underline font-semibold"
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetails;