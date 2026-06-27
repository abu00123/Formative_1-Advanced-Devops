import React from 'react';
import { Star } from 'lucide-react';

function RecentRequests({ requests }) {
  return (
    <div className="py-4">
      <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">
        Last requests
      </span>
      <div className="flex flex-col space-y-4">
        {requests.map((req, index) => (
          <div key={req.id || index} className="flex items-center space-x-3">
            <span className="text-xs font-medium text-gray-300 w-4 shrink-0">
              {index + 1}
            </span>
            {req.cover_url ? (
              <img
                src={req.cover_url}
                alt={req.title}
                className="w-8 h-8 rounded object-cover shrink-0 grayscale"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
                <span className="text-[10px] text-gray-400">Doc</span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-charcoal truncate">
                {req.title}
              </p>
              <p className="text-[10px] text-gray-400 truncate">
                {req.author}
              </p>
            </div>
            <div className="flex items-center space-x-1 shrink-0 text-right">
              <Star className="w-3 h-3 fill-star-gold text-star-gold" />
              <span className="text-[10px] font-semibold text-charcoal">
                {req.rating ? Number(req.rating).toFixed(1) : '0.0'}
              </span>
              <span className="text-[9px] text-gray-400">
                ({req.reviews_count || 0})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentRequests;
