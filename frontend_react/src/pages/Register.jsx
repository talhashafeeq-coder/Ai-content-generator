import React, { useState } from 'react';
import '../style/Login.css';
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('http://localhost:5000/api/users/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setMessage('User registered successfully!');
      setForm({ username: '', email: '', password: '' });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Register</h2>
          <p className="subtext">Create a new account</p>
          {message && (
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
              required
            />
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              required
            />
            <label>Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
              minLength={6}
              required
            />
            <button type="submit">Register</button>
          </form>
          <div className="register-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
