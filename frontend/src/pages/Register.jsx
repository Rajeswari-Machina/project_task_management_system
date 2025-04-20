import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
const Login = () => {
    const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('member');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
        await register({name,email, password,role});
        navigate('/login');
    } catch (err) {
        setError(err.message);
    }
    };

    return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
        <div className='border-2 rounded-xl border-emerald-600 p-20'>
            <div className='text-red'> <h3>{error? error : null} </h3></div>
            <form 
            onSubmit={handleSubmit}
            className='flex flex-col items-center justify-center'
            >
               <input 
                value={name}
                onChange={(e)=>{
                    setname(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="text" placeholder='Enter your name' 
                />
                <input 
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="email" placeholder='Enter your email' 
                />
                <input
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required 
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' />
                <select
                value={role}
                onChange={(e)=>{
                    setRole(e.target.value)
                }}
                required
                className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400 hover:border-emerald-800 focus:border-emerald-800 transition-colors duration-300' 
                >
                <option value="member" className='bg-emerald-600 text-white'>Member</option>
                <option value="admin" className='bg-emerald-600 text-white'>Admin</option>
                </select>
                <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white transition-all duration-300'>Register</button>
              </form>
            </div>
              <div className='flex flex-col mt-5'>
                <p className='text-gray-400'>Already Registered?</p>
                <button 
                onClick={()=>{
                    navigate('/login')
                }}
                className='mt-2 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white'>Login</button>
                </div>
    </div>
)}
export default Login