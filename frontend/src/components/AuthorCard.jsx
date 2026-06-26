import React from 'react';
import { Star } from 'lucide-react';

function AuthorCard({ author, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex-shrink-0 w-[130px] cursor-pointer group select-none"
    >
      <div className="w-[130px] h-[130px] rounded-xl overflow-hidden mb-2 bg-gray-50 border border-gray-100">
        <img
          src={author.portrait_url}
          alt={author.name}
          className="w-full h-full object-cover grayscale transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-xs font-semibold text-charcoal truncate mb-0.5">
        {author.name}
      </h3>
      <div className="flex items-center space-x-1 text-[10px] text-gray-400">
        <Star className="w-3 h-3 fill-star-gold text-star-gold" />
        <span className="font-semibold text-charcoal">
          {Number(author.rating).toFixed(1)}
        </span>
        <span>({author.reviews_count})</span>
      </div>
    </div>
  );
}

export default AuthorCard;
