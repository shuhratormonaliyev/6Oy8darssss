import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError('Iltimos, barcha maydonlarni toldiring.');
      setLoading(false);
      return;
    }

    fetch('https://auth-rg69.onrender.com/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          navigate('/home');
        } else {
          setError(data.message || 'Tizimga kirishda xatolik yuz berdi.');
        }
      })
      .catch((err) => {
        setLoading(false);
        setError('Tarmoq xatosi. Iltimos, qaytadan urinib koring.');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Tizimga kirish</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="border p-2 w-full rounded-md"
              placeholder="Emailni kiriting"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Parol
            </label>
            <input
              type="password"
              id="password"
              ref={passwordRef}
              className="border p-2 w-full rounded-md"
              placeholder="Parolni kiriting"
            />
          </div>
          <div>
            {loading ? (
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
                disabled
              >
                <span className="loading loading-spinner"></span> Yuklanmoqda...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Kirish
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
