import { useState } from "react";
export default function Register()
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
     
   async function register(ev){
      ev.preventDefault();
      await  axios.post('/register',{username,password});
    }
    return(
    <div className="bg-blue-200 h-screen flex items-center">
        <form className="w-64 mx-auto mb-12" onSubmit={Register}>
            <input value={username} onChange={ev => setUsername(ev.target.value)} type="text" placeholder="Username" className="block w-full rounded-sm p-2 mb-2"></input>
            
            <input value={password} onChange={ev =>setPassword(ev.target.value)}type="password" placeholder="Password" className="block w-full  rounded-sm p-2 mb-2"></input>
        <button className="bg-black text-white w-full rounded-sm p-2">Register</button>
        </form>
    </div>
);
}