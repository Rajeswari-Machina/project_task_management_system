import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [asignTo, setAsignTo] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Pending');
    const [projectId, setProjectId] = useState('');
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch users from the backend
        axios.get('https://backend-service-m0q3.onrender.com/api/auth/users', {
            withCredentials: true,
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });

        // Fetch projects from the backend
        axios.get('https://backend-service-m0q3.onrender.com/api/projects', {
            withCredentials: true,
        })
        .then((response) => {
            setProjects(response.data);
        })
        .catch((error) => {
            console.error('Error fetching projects:', error);
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            projectId,
            assignedTo: asignTo,
            status,
            priority,
        };

        axios.post(
            `https://backend-service-m0q3.onrender.com/api/tasks/${projectId}`,
            newTask,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        )
        .then((response) => {
            console.log('Task created successfully:', response.data);
        })
        .catch((error) => {
            console.error('Error creating task:', error);
        });

        setTaskTitle('');
        setCategory('');
        setAsignTo('');
        setTaskDate('');
        setTaskDescription('');
        setPriority('Medium');
        setStatus('Pending');
        setProjectId('');
    };

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <form
                onSubmit={(e) => {
                    submitHandler(e);
                }}
                className='flex flex-wrap w-full items-start justify-between'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => {
                                setTaskTitle(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type='text'
                            placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => {
                                setTaskDate(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type='date'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
                        <select
                            value={asignTo}
                            onChange={(e) => {
                                setAsignTo(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-black'
                        >
                            <option value='' className='text-black' disabled>Select a user</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id} className='text-black'>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type='text'
                            placeholder='design, dev, etc'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Priority</h3>
                        <select
                            value={priority}
                            onChange={(e) => {
                                setPriority(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                        >
                            <option className='text-black'value='Low'>Low</option>
                            <option className='text-black' value='Medium'>Medium</option>
                            <option className='text-black'  value='High'>High</option>
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Status</h3>
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded text-black outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                        >
                            <option className='text-black' value='Pending'>Pending</option>
                            <option className='text-black'value='In Progress'>In Progress</option>
                            <option className='text-black' value='Done'>Done</option>
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Project</h3>
                        <select
                            value={projectId}
                            onChange={(e) => {
                                setProjectId(e.target.value);
                            }}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 text-black'
                        >
                            <option value=''className='text-black' disabled>Select a project</option>
                            {projects.map((project) => (
                                <option className='text-black' key={project._id} value={project._id}>
                                    {project.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => {
                            setTaskDescription(e.target.value);
                        }}
                        className='w-full h-44 text-sm py-2 px-4  rounded outline-none bg-transparent border-[1px] border-gray-400'
                        name=''
                        id=''
                    ></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;