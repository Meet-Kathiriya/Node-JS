import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewProfile() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:1008/viewAdmin", {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(res.data);

        const userData = res.data.data;

        setUsers([userData]);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen p-10 bg-gray-900 text-white">

            <h1 className="text-4xl font-bold mb-8 text-center">Admin Information</h1>

            <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-3xl mx-auto">

                <table className="table-auto w-full">
                    <thead>
                        <tr className="text-gray-300 border-b border-gray-600">
                            <th className="p-3 text-center">Name</th>
                            <th className="p-3 text-center">Role</th>
                            <th className="p-3 text-center">Email</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((e, i) => (
                            <tr key={i} className="hover:bg-gray-700">
                                <td className="p-3 text-center">{e.username}</td>
                                <td className="p-3 text-center">{e.role}</td>
                                <td className="p-3 text-center">{e.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

        </div>
    );
}
