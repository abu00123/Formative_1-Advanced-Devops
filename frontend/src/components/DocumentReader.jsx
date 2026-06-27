import React, { useEffect } from 'react';
import { X, BookOpen, Star } from 'lucide-react';

function DocumentReader({ archive, onClose }) {
  useEffect(() => {
    if (archive) {
      fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: archive.title,
          author: archive.author_name,
          cover_url: archive.cover_url || '',
          rating: archive.rating,
          reviews_count: archive.reviews_count
        })
      }).catch(err => console.error(err));
    }
  }, [archive]);

  if (!archive) return null;

  return (
    <div className="fixed inset-0 bg-editorial-dark/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center space-x-2 text-brand-blue text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{archive.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-xl mx-auto">
            <div className="mb-6 font-sans">
              <span className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-500 text-[10px] font-medium uppercase tracking-wider mb-2">
                {archive.century}
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal leading-tight mb-2">
                {archive.title}
              </h2>
              <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
                <span className="font-semibold text-charcoal">{archive.author_name}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3.5 h-3.5 fill-star-gold text-star-gold" />
                  <span className="font-semibold text-charcoal">{Number(archive.rating).toFixed(1)}</span>
                  <span>({archive.reviews_count} reviews)</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6 text-charcoal text-base leading-relaxed space-y-4 whitespace-pre-line font-serif">
              {archive.content || 'No content available for this document.'}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-charcoal text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocumentReader;
