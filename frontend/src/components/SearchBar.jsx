import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

function SearchBar({ onSearch, category, setCategory, century, setCentury, categories, centuries }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-6 w-full py-4 border-b border-gray-100">
      <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg h-11">
        <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search archives..."
          className="bg-transparent border-none outline-none w-full text-charcoal placeholder-gray-400 text-sm"
        />
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group cursor-pointer">
          <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Category</span>
          <div className="flex items-center space-x-1 mt-0.5">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="appearance-none bg-transparent pr-5 py-0 border-none outline-none text-xs font-medium text-charcoal cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 bottom-0.5 pointer-events-none" />
          </div>
        </div>

        <div className="relative group cursor-pointer">
          <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Century</span>
          <div className="flex items-center space-x-1 mt-0.5">
            <select
              value={century}
              onChange={(e) => setCentury(e.target.value)}
              className="appearance-none bg-transparent pr-5 py-0 border-none outline-none text-xs font-medium text-charcoal cursor-pointer"
            >
              {centuries.map((cen) => (
                <option key={cen} value={cen}>
                  {cen}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-0 bottom-0.5 pointer-events-none" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-11 h-11 rounded-full bg-editorial-dark hover:bg-gray-800 text-white font-sans text-xs font-semibold uppercase tracking-wider flex items-center justify-center transition-all hover:scale-105"
      >
        Go
      </button>
    </form>
  );
}

export default SearchBar;
