import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider'; 
import PropTypes from 'prop-types';


const Navbar = ({ user }) => {

  // eslint-disable-next-line react/prop-types
  const userRole = user? user.role : 'guest'; 
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth(); 
  const navigate = useNavigate();

  const logOutUser = async () => {
    try {
      await logout();  
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      alert('Logout failed');
    }
  };
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linksByRole = {
    admin: [
      { name: 'createProject', path: '/create-project' },
      { name: 'All projects', path: '/projects' },
      { name: 'Create Task', path: '/create-task' },
      {name:'members',path:'/members'},
      
    ],
  
    member: [
      { name: 'Tasks', path: '/tasks' },
      { name: 'projects', path: '/projects' },
      {name:'assignedTasks',path:'/assignedTasks'}
    ],
    guest: [
      { name: 'Home', path: '/' },
      { name: 'Login', path: '/login' },
    ],
  };

  const navLinks = linksByRole[userRole] || [];

  return (
    <nav className="bg-emerald-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">MyApp</Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-gray-200 transition"
            >
              {link.name}
            </Link>
          ))}
          {user?
            <button
              onClick={logOutUser}
              className="bg-red-600 mt-0 hover:bg-red-700 text-white font-medium px-5 py-2 rounded"
            >
              Log Out
            </button>:null}
          
          
        </div>

       
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-base border-b border-white/20 hover:text-gray-200 transition"
            >
              {link.name}
            </Link>
          ))}
          {user?<button
        onClick={logOutUser}
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded"
      >
        Log Out
      </button>:null}
        </div>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
};

export default Navbar;

