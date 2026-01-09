"use client";

import { useState } from 'react';
// import { useRouter } from 'next/router';
import api from '../services/api';
import { setToken } from '../utils/auth';

const LoginPage = () => {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);
      // router.push('/dashboard');
      window.location.href = "/dashboard";
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
