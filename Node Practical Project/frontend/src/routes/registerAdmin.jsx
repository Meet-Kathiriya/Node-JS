import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:1008/registerAdmin", {
        username,
        role,
        email,
        password,
      })
      .then(
        (res) => {
          setMsg(res.data.msg);
          setUsername("");
          setRole("");
          setEmail("");
          setPassword("");
          navigate("/loginAdmin");
          alert(res.data.msg)
        },
        (err) => {
          setMsg("Error: " + (err.response?.data?.msg || err.message));
        }
      );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-10 rounded-xl shadow-xl w-full max-w-md text-white"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>

        {msg && (
          <div className="bg-gray-700 p-3 rounded text-center mb-4">
            {msg}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter UserName"
          className="w-full p-3 mb-4 rounded bg-gray-700 focus:outline-none"
          onChange={(e) => setUsername(e.target.value)}
        />


        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-4 rounded bg-gray-700 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Role"
          className="w-full p-3 mb-4 rounded bg-gray-700 focus:outline-none"
          onChange={(e) => setRole(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded mt-4"
        >
          Register
        </button>
        <p className="text-center text-xl mt-6"> Already Have an accout ?
            <Link to='/loginAdmin' className='text-blue-400'> Login</Link>
        </p> 
      </form>
    </div>
  );
}
