'use client';
import { useState } from 'react';
import './styles.css'; // Import the CSS file

export default function Page() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!firstname || !lastname || !username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ firstname, lastname, username, password }),
    });

    const result = await res.json();

    if (res.ok) {
      console.log(result);
      setError('');
      // Optionally, redirect or clear form
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Sign Up Form</h5>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">First Name (ชื่อจริง)</label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Last Name (นามสกุล)</label>
              <input
                type="text"
                id="lastname"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username (ชื่อผู้ใช้)</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password (รหัสผ่าน)</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassWord(e.target.value)}
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-box-arrow-right"></i> Sign Up (สมัครสมาชิก)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
