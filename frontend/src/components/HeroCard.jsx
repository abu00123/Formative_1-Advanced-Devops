import React from 'react';

function HeroCard() {
  return (
    <div className="relative h-64 bg-editorial-dark rounded-2xl overflow-hidden flex items-stretch">
      <div className="flex-1 p-6 flex flex-col justify-between z-10">
        <h1 className="text-2xl md:text-3xl font-sans font-black text-white uppercase tracking-tight leading-none max-w-[200px]">
          Rwandan Heritage
        </h1>
        <p className="text-[11px] text-gray-400 max-w-[220px]">
          Discover the oral histories, academic papers, and traditions of Rwanda.
        </p>
      </div>
      <div className="w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=500&auto=format&fit=crop&q=80"
          alt="Historical Rwandan Portrait"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-editorial-dark via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default HeroCard;
