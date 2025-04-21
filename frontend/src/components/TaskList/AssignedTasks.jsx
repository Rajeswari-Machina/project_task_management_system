import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

const AssignedTasks = () => {
  const { user } = useAuth();
  const userId = user._id;
  console.log(user);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`https://backend-service-m0q3.onrender.com/api/tasks/${userId}`,{withCredentials:true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`/api/tasks/${taskId}/status`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err.message);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Assigned Tasks</h1>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks assigned to you.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{task.title}</h2>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                  Project: <span className="font-medium">{task.projectName?.title || 'N/A'}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Assigned To: <span className="font-medium">{task.assignedToName?.name || 'N/A'}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Status: <span className="font-medium">{task.status}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Priority: <span className="font-medium">{task.priority}</span>
                </p>
              </div>
              <div className="flex space-x-2">
                {['Pending', 'In Progress', 'Done'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateTaskStatus(task._id, status)}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      task.status === status
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;