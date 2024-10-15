import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit() {
        //validate username and password
        if(username === "" || password === "") {
            setError("Please enter a valid username and password");
        }

        try {
            const data = {
                username: username,
                password: password
            }

            const response = await axios.post("http://localhost:8081/auth/login", data);
            login(response.data);
            navigate("/");

        } catch (error) {
            setError("Your username and password cannot be validated");
        }
    }

    return (
        <div className="py-10 px-5">
            <div className="max-w-[600px] mx-auto p-8 shadow-xl rounded-lg">
                <div className="text-center mb-5">
                    <h1 className="text-2xl font-semibold">Login</h1>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="mb-1 block">Username</label>
                        <input type="text" onChange={function (event) {
                            setUsername(event.target.value);
                            setError("");
                        }} className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your username" />
                    </div>
                    <div className="mb-3">
                        <label className="mb-1 block">Password</label>
                        <input type="password" onChange={function (event) {
                            setPassword(event.target.value);
                            setError("");
                        }} className="w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your password" />
                    </div>
                        
                    {error && <div className="text-sm text-red-500">{error}</div>}

                    <div className="mt-5">
                        <button type="button" onClick={handleSubmit} className="w-full rounded-lg px-4 py-2 bg-gray-800 text-white hover:bg-gray-950">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;