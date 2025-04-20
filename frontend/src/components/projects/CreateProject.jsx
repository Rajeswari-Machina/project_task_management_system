import { useState } from 'react';
import axios from 'axios';
const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://backend-service-m0q3.onrender.com/api/projects`,
        { title, description },
        { withCredentials: true }
      );
      console.log(response);
      alert('Project created successfully');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <div className="border-2 rounded-xl border-emerald-600 p-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-600">
          Create Project
        </h2>
        <form
          onSubmit={handleCreateProject}
          className="flex flex-col items-center justify-center"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 w-full mb-4"
          />
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-lg placeholder:text-gray-400 w-full mb-4"
          />
          <button
            type="submit"
            className="mt-4 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;