import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', username);
            navigate('/chat');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="p-8 border rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">Log In</button>
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-600">Don't have an account? </span>
                    <a href="/create-user" className="text-blue-500 hover:underline">Create one</a>
                </div>
            </form>
        </div>
    );
};

export default Login;