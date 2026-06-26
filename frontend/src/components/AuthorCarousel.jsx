import React from 'react';

function AuthorCarousel({ authors, selectedAuthorId, onSelectAuthor }) {
  const activeAuthor = authors.find(a => a.id === selectedAuthorId);

  return (
    <div className="py-4 border-b border-gray-100">
      <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">
        Featured Scholars & Figures
      </span>
      <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onSelectAuthor(null)}
          className={`flex-shrink-0 w-11 h-11 rounded-lg border-2 flex items-center justify-center text-xs font-semibold uppercase tracking-wider transition-all ${
            selectedAuthorId === null
              ? 'border-brand-blue bg-blue-50 text-brand-blue'
              : 'border-gray-200 text-gray-400 hover:border-gray-400'
          }`}
        >
          All
        </button>
        {authors.map((author) => (
          <button
            key={author.id}
            onClick={() => onSelectAuthor(author.id)}
            className={`flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden border-2 transition-all ${
              selectedAuthorId === author.id
                ? 'border-brand-blue scale-105 shadow-sm'
                : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={author.portrait_url}
              alt={author.name}
              className="w-full h-full object-cover grayscale"
            />
          </button>
        ))}
      </div>
      {activeAuthor && (
        <p className="mt-2 text-xs font-medium text-charcoal tracking-wide">
          {activeAuthor.name}
        </p>
      )}
    </div>
  );
}

export default AuthorCarousel;
