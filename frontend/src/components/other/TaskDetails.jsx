import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentsSection from '../Comments';
const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const res = await axios.get(`https://backend-service-m0q3.onrender.com/api/tasks/${taskId}`,{withCredentials:true});
        setTask(res.data);
      } catch (err) {
        console.error('Error fetching task details:', err);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  if (!task) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg font-medium text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="border-2 rounded-xl border-emerald-600 p-10 w-11/12 max-w-3xl bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6">{task.title}</h1>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Description:</strong> {task.description}
        </p>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Project:</strong> {task.projectId?.name || 'N/A'}
        </p>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Assigned To:</strong> {task.assignedTo?.name || 'N/A'}
        </p>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Status:</strong> {task.status}
        </p>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Priority:</strong> {task.priority}
        </p>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Created At:</strong> {new Date(task.createdAt).toLocaleString()}
        </p>
        <p className="mb-4 text-gray-700">
          <strong className="text-emerald-600">Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}
        </p>

        <div className="mt-8">
          <CommentsSection taskId={taskId} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;