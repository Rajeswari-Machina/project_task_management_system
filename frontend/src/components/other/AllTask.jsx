import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`https://backend-service-m0q3.onrender.com/api/tasks/`,{withCredentials:true}); 
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
   
  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Task Name</h2>
        <h3 className='text-lg font-medium w-1/5'>Assigned To</h3>
        <h5 className='text-lg font-medium w-1/5'>Status</h5>
        <h5 className='text-lg font-medium w-1/5'>Priority</h5>
        <h5 className='text-lg font-medium w-1/5'>Due Date</h5>
      </div>
      <div className=''>
        {tasks.map((task, idx) => (
          <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium text-white w-1/5'>{task.project}</h2>
            <h2 className='text-lg font-medium text-white w-1/5'>{task.title}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-400'>{task.description}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{task.assignedTO}</h5>
            <h5 className='text-lg font-medium w-1/5 text-white'>{task.priority}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{new Date(task.status).toLocaleDateString()}</h5>
            <Link to={`/tasks/${task._id}`} className='text-blue-500 underline ml-4'>View More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;