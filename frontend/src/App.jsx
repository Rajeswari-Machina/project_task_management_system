
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthProvider';
import CreateProject from './components/projects/CreateProject';
import Navbar from './components/Navbar';
import AllProjects from './components/projects/AllProjects';
import TaskList from './components/TaskList/TaskList';
import ProjectDetails from './components/projects/projectDetails';
import CreateTask from './components/other/CreateTask';
import Home from './components/Home';
import AssignedTasks from './components/TaskList/AssignedTasks';
import Users from './components/Users';
const App = () => {
  const { user } = useAuth(); 
  return (
    <>
      <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
        <Navbar user={user} />
      </div>
      <div style={{ paddingTop: '60px' }}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/members' element={<Users/>}/>
          <Route path="/create-project" element={<CreateProject/>} />
          <Route path="/projects"  element={<AllProjects/>} />
          <Route path="/projects/:projectId" element={<ProjectDetails/>} />
          <Route path="/projects/:projectId/tasks" element={<TaskList/>} />
          <Route path='/assignedTasks' element={<AssignedTasks/>}/>
          <Route path="/create-task" element={<CreateTask/>} />
          <Route path="*" element={<div className="p-5 text-center text-red-500">404 Not Found</div>} />
        </Routes>
      </div>
    </>
  );
}
export default App;
