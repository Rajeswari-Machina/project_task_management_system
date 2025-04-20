import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comments from '../Comments'; 
import { useAuth } from '../../context/AuthProvider';

const TaskList = () => {
  const { projectId } = useParams();
  const { user } = useAuth(); 

  const [tasks, setTasks] = useState([]); 
  const [filter, setFilter] = useState('All'); 

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/tasks/${projectId}`, { withCredentials: true });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      // Add dummy data in case of an error
      setTasks([
        { _id: '1', title: 'Task 1', description: 'Description for Task 1', status: 'Pending', assignedTo: { _id: '123', name: 'John Doe' } },
        { _id: '2', title: 'Task 2', description: 'Description for Task 2', status: 'In Progress', assignedTo: { _id: '124', name: 'Jane Smith' } },
        { _id: '3', title: 'Task 3', description: 'Description for Task 3', status: 'Done', assignedTo: null },
      ]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'AssignedToMe') return task.assignedTo?._id === user?._id;
    return task.status === filter;
  });

  return (
    <div>
      <h2 className="text-xl font-bold my-4">Tasks for Project</h2>

      <div className="mb-4 flex gap-3">
        {['All', 'AssignedToMe', 'Pending', 'In Progress', 'Done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredTasks.map((task) => (
        <div key={task._id} className="border p-4 my-3 rounded shadow">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>Project: <span className="font-medium text-blue">{task.projectId?.title}</span></p>
          <h5 className="text-lg font-semibold">Description:</h5>
          <p className="text-sm text-gray-700 text-white">{task.description}</p>
          <p>Status: <span className="font-medium text-white">{task.status}</span></p>
          <p>Assigned to: {task.assignedTo?.name || 'Unassigned'}</p>
          <Comments taskId={task._id} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
