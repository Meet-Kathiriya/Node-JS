import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:1008/loginAdmin", {
      email,
      password
    });
    localStorage.setItem("token", res.data.token);

    setEmail("");
    setPassword("");
    
    navigate("/viewProfile");
    alert(res.data.msg);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      
      <div className="w-[380px] bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20 animate-fadeIn">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Welcome
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:bg-white/30 outline-none transition"
          />

          <button className="w-full p-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition mt-4">
            Login
          </button>
          <p className="text-center text-xl mt-6 text-white"> Already Have an accout ?
            <Link to='/registerAdmin' className='text-blue-400'> Register</Link>
        </p>

        </form>

      </div>

    </div>
  );
}
