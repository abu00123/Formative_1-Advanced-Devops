import React from 'react';
import { Star } from 'lucide-react';

function ArchiveCard({ archive, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[120px] cursor-pointer group select-none"
    >
      <div className="w-[120px] h-[160px] rounded-xl overflow-hidden mb-2 bg-gray-50 border border-gray-100 shadow-sm">
        {archive.cover_url ? (
          <img
            src={archive.cover_url}
            alt={archive.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-between p-3 bg-slate-800 text-white font-serif">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
              {archive.category}
            </span>
            <span className="text-xs font-semibold leading-tight line-clamp-3">
              {archive.title}
            </span>
            <span className="text-[9px] text-gray-400 font-sans">
              {archive.century}
            </span>
          </div>
        )}
      </div>
      <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider truncate">
        {archive.author_name}
      </p>
      <h3 className="text-xs font-semibold text-charcoal leading-snug line-clamp-1 mb-0.5">
        {archive.title}
      </h3>
      <div className="flex items-center space-x-1 text-[10px] text-gray-400">
        <Star className="w-3 h-3 fill-star-gold text-star-gold" />
        <span className="font-semibold text-charcoal">
          {Number(archive.rating).toFixed(1)}
        </span>
        <span>({archive.reviews_count})</span>
      </div>
    </div>
  );
}

export default ArchiveCard;
