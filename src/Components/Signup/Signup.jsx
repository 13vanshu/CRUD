import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required ❌");
            return;
        }

        try {
            console.log("SENDING DATA TO BACKEND :-", formData);
            const res = await fetch("http://localhost:2000/signup/signupuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log("RESPONSE FROM BACKEND =>", data);
            if (res.ok) {
                toast.success( "User Registered Successfully 🎉");
            } else {
                toast.error(data.message || "Something went wrong ❌");
            }
        } catch (error) {
            console.log(error);
            toast.error("Server not responding ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white w-96 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Create Account
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Sign up to continue
                </p>
                <form onSubmit={handleSubmit} >

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1 font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder="Enter username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1 font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
                    >
                        Create Account
                    </button>

                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Already have an account?
                    <a href="/login" className="text-blue-600 font-semibold ml-1 hover:underline">
                        Login
                    </a>
                </p>

            </div>
        </div>
    );
};

export default Signup;