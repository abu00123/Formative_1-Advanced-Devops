import React, { useState } from 'react';

function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-sm bg-white border border-gray-100 p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-serif text-charcoal mb-6 text-center">Admin Portal</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-semibold rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-charcoal outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <label className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-charcoal outline-none focus:border-brand-blue"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-charcoal text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors h-11"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
