import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); 

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;

    
    if (!username || !email || !password || !rePassword) {
      setError('Iltimos, barcha maydonlarni to\'ldiring.');
      setLoading(false); 
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Iltimos, haqiqiy email manzilini kiriting.');
      setLoading(false); 
      return;
    }

    if (password !== rePassword) {
      setError('Parol va qayta kiritilgan parol mos emas.');
      setLoading(false); 
      return;
    }

    if (password.length < 6) {
      setError('Parol kamida 6 ta belgidan iborat bolishi kerak.');
      setLoading(false);
      return;
    }

    fetch('https://auth-rg69.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccess('Muvaffaqiyatli royxatdan otdingiz!');
          setLoading(false);
          navigate('/login');
        } else {
          setError(data.message || 'Royxatdan otishda xatolik.');
          setLoading(false);
        }
      })
      .catch(err => {
        setError('Tarmoq xatosi. Iltimos, qayta urinib koring.');
        setLoading(false); 
      });
  };

  return (
    <div className="container mx-auto max-w-md p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6">Ro'yxatdan o'tish</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}

        <input
          type="text"
          ref={usernameRef}
          placeholder="Foydalanuvchi nomi"
          className="input input-bordered w-full"
        />
        <input
          type="email"
          ref={emailRef}
          placeholder="Email manzili"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Parol"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          ref={rePasswordRef}
          placeholder="Parolni qayta kiriting"
          className="input input-bordered w-full"
        />

        {loading ? (
          <div className="flex justify-center my-4">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <button type="submit" className="btn btn-primary w-full">
            Ro'yxatdan o'tish
          </button>
        )}
      </form>
    </div>
  );
}

export default Register;
