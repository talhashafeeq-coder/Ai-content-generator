import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('http://localhost:5000/user/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      localStorage.setItem('token', data.access_token);
      setMessage('Login successful! Redirecting...');
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="login-page">
  <div className="login-wrapper">
    <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtext">Log in to your AI Blog Generator account</p>
        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
          <button type="submit">Login</button>
          <div className="register-link">
            Don’t have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
      </div>
  );
}
