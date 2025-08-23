import React, { useState } from "react";
import { useSubject } from "../context/SubjectContext";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { setUser } = useSubject();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (isLogin) {
                response = await axios.post(`${backendUrl}/api/v1/auth/login`, {
                    email: formData.email,
                    password: formData.password
                }, { withCredentials: true });

                if (response.data.success) {
                    toast.success(response.data.message);
                    setUser(response.data.user.username);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            } else {
                response = await axios.post(`${backendUrl}/api/v1/auth/signup`, {
                    username: formData.name,
                    email: formData.email,
                    password: formData.password
                }, { withCredentials: true });
                if (response.data.success) {
                    toast.success(response.data.message);
                    setUser(response.data.user.username);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }

            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Show backend error message
                toast.error(error.response.data.message);
                console.log(`Backend error: ${error.response.data.message}`);
            } else {
                // Generic error
                toast.error("Something went wrong");
                console.log(`Error in ${isLogin ? "login" : "signup"} component`, error.message);
            }
        }


        setFormData({
            name: "",
            email: "",
            password: ""
        });
    };

    return (
        <div className="min-h-screen bg-[#dfdfdf] flex items-center justify-center">
            <div className="w-full max-w-md">
                <header className="text-4xl font-bold text-center text-gray-800 mb-10">
                    {isLogin ? "Login" : "Sign Up"}
                </header>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 text-[17px] bg-white border-0 outline-none focus:outline-none focus:ring-0 h-[60px] rounded-[30px] placeholder:text-[#222] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.05)] transition duration-300"
                            />
                        </div>
                    )}

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-[17px] bg-white border-0 outline-none focus:outline-none focus:ring-0 h-[60px] rounded-[30px] placeholder:text-[#222] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.05)] transition duration-300"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-[17px] bg-white border-0 outline-none focus:outline-none focus:ring-0 h-[60px] rounded-[30px] placeholder:text-[#222] shadow-[0px_5px_10px_1px_rgba(0,0,0,0.05)] transition duration-300"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="admin"
                            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                        />
                        <label htmlFor="admin" className="text-gray-700">
                            i agree to the term of use & privacy policy
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-[60px] rounded-[30px] border-none bg-[#222] cursor-pointer text-white font-medium transform hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 ease-in-out shadow-[0px_5px_10px_rgba(0,0,0,0.1)] hover:shadow-[0px_8px_20px_rgba(0,0,0,0.15)]"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>

                    <p className="text-sm text-center text-gray-600">
                        {isLogin ? (
                            <>
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Sign up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
