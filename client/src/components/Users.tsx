import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Users = () => {
    const navigate = useNavigate();
    const url = "http://localhost:8080/user";
    const [users, setUsers] = useState<any>([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id: any) => {
        try {
            const response = await axios.delete(`${url}/${id}`);
            toast.success(response.data);
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user");
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = (user: any) => {
        navigate("/add-user", { state: { id: user.id, name: user.name, age: user.age, branch: user.branch } });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-3xl font-semibold text-purple-400 mb-6">Users</h1>
            <div className="w-full max-w-4xl overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                    <thead className="bg-orange-400 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Age</th>
                            <th className="border border-gray-300 px-4 py-2">Branch</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user: any) => (
                            <tr
                                key={user.id}
                                className="text-center hover:bg-gray-800 transition-colors text-white bg-gray-800"
                            >
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.age}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.branch}</td>
                                <td className="border border-gray-300 px-4 py-2 flex gap-3 items-center justify-center">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Delete User"
                                    >
                                        <FaRegTrashCan className="inline-block" />
                                    </button>
                                    <button
                                        onClick={() => handleUpdate(user)}
                                        className="text-white hover:text-slate-300 transition-colors"
                                        title="Delete User"
                                    >
                                        <CiEdit className="inline-block" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <p className="text-gray-500 text-center mt-4">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Users;
