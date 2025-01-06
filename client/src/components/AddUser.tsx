import { useState, useRef, useEffect } from "react";
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const AddUser = () => {
    const inputref = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const url = "http://localhost:8080/user";

    const [name, setName] = useState<string>(state?.name ?? "");
    const [id, setId] = useState<number | null>(state?.id ?? null);
    const [age, setAge] = useState<number | null>(state?.age ?? null);
    const [branch, setBranch] = useState<string>(state?.branch ?? "");

    const handleSubmit = () => {
        if (!name || !id || !age || !branch) {
            toast.error("Please fill in all the form details");
            return;
        } else {
            const payload = {
                name: name,
                id: id,
                age: age,
                branch: branch,
            };
            axios.post(url, payload).then((res) => {
                toast.success(res.data);
                navigate("/");
            }).catch((err) => {
                toast.error(err);
            });
        }
    };

    useEffect(() => {
        if (inputref.current) {
            inputref.current.focus();
        }
    }, []);

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-teal-400 text-center mb-6">
                    Add a User
                </h2>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter Name..."
                            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            ref={inputref}
                        />
                    </div>

                    <div>
                        <label htmlFor="id" className="block text-sm font-medium text-gray-300">
                            ID
                        </label>
                        <input
                            id="id"
                            type="number"
                            placeholder="Enter ID..."
                            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            onChange={(e) => setId(Number(e.target.value))}
                            value={id ?? ""}
                            disabled={state?.id}
                        />
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            placeholder="Enter Age..."
                            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            onChange={(e) => setAge(Number(e.target.value))}
                            value={age ?? ""}
                        />
                    </div>

                    <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-gray-300">
                            Branch
                        </label>
                        <input
                            id="branch"
                            type="text"
                            placeholder="Enter Branch..."
                            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                            onChange={(e) => setBranch(e.target.value)}
                            value={branch}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
