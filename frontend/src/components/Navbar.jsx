import React from 'react';
import { BookOpen, LogOut } from 'lucide-react';

function Navbar({ activeTab, setActiveTab, user, onLogout }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
        <BookOpen className="w-6 h-6 text-brand-blue" />
        <span className="font-sans font-semibold tracking-wider text-charcoal text-sm uppercase">
          Rwandan Archives
        </span>
      </div>

      <nav className="flex space-x-8">
        <button
          onClick={() => setActiveTab('home')}
          className="relative py-2 text-sm font-medium text-charcoal hover:opacity-80 transition-opacity"
        >
          Home
          {activeTab === 'home' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-brand-blue rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className="relative py-2 text-sm font-medium text-charcoal hover:opacity-80 transition-opacity"
        >
          About
          {activeTab === 'about' && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-brand-blue rounded-full" />
          )}
        </button>
        {user && (
          <button
            onClick={() => setActiveTab('admin')}
            className="relative py-2 text-sm font-medium text-charcoal hover:opacity-80 transition-opacity"
          >
            Admin Panel
            {activeTab === 'admin' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-brand-blue rounded-full" />
            )}
          </button>
        )}
      </nav>

      <div className="flex items-center space-x-3">
        {user ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-charcoal font-semibold text-sm">
              {user.username[0].toUpperCase()}
            </div>
            <span className="text-sm font-medium text-charcoal">{user.username}</span>
            <button
              onClick={onLogout}
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-charcoal transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveTab('login')}
            className="relative py-2 text-sm font-medium text-charcoal hover:opacity-80 transition-opacity"
          >
            Sign In
            {activeTab === 'login' && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-brand-blue rounded-full" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;
