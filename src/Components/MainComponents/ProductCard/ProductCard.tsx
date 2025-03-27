"use client"

import { useState } from "react"

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  photos: { url: string }[];
  category?: string;
  condition?: string;
  seller?: {
    name: string;
    rating?: number;
  };
  story?: string;
  weddingStyle?: string; // New field for wedding style
  season?: string; // New field for wedding season
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Calculate discount if originalPrice is provided
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;


  // Wedding category styling
  const getCategoryColor = (category?: string) => {
    if (!category) return "bg-gray-100 text-gray-800";
    
    switch (category.toLowerCase()) {
      case "dresses":
        return "bg-pink-100 text-pink-800"
      case "decor":
        return "bg-indigo-100 text-indigo-800"
      case "accessories":
        return "bg-purple-100 text-purple-800"
      case "flowers":
        return "bg-emerald-100 text-emerald-800"
      case "invitations":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Condition styling
  const getConditionColor = (condition?: string) => {
    if (!condition) return "bg-gray-100 text-gray-800";
    
    switch (condition) {
      case "New with tags":
        return "bg-emerald-100 text-emerald-800"
      case "Sample sale":
        return "bg-violet-100 text-violet-800"
      case "Once worn":
        return "bg-blue-100 text-blue-800"
      case "Vintage":
        return "bg-amber-100 text-amber-800"
      case "Like New":
        return "bg-blue-100 text-blue-800"
      case "Excellent":
        return "bg-purple-100 text-purple-800"
      case "Good":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Wedding style styling
  const getStyleColor = (style?: string) => {
    if (!style) return "";
    
    switch (style.toLowerCase()) {
      case "classic":
        return "bg-slate-100 text-slate-800"
      case "modern":
        return "bg-zinc-100 text-zinc-800"
      case "bohemian":
        return "bg-amber-100 text-amber-800"
      case "vintage":
        return "bg-rose-100 text-rose-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-soft hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.photos[0]?.url || "/placeholder.svg"}
          alt={product.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Favorite button with animation */}
        <button
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-9 w-9 shadow-sm z-10 transition-transform duration-300 hover:scale-110"
          onClick={(e) => {
            e.preventDefault()
            setIsFavorite(!isFavorite)
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor" 
            className={`h-5 w-5 transition-all duration-300 ${
              isFavorite ? "text-primary scale-110" : "text-neutral-600"
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>


        {/* Discount badge with animation */}
        {discount >= 10 && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 z-10 animate-pulse-soft">
            {discount}% OFF
          </div>
        )}


        {/* Quick view button with animation */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-white/90 backdrop-blur-sm text-neutral-900 hover:bg-white border border-neutral-200 shadow-sm py-2 rounded-md">
            Quick View
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-serif text-lg font-medium text-neutral-900 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </div>

        {/* Tags section */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {/* Condition tag */}
          {product.condition && (
            <div className={`text-xs px-2 py-0.5 rounded-full ${getConditionColor(product.condition)}`}>
              {product.condition}
            </div>
          )}
          
          {/* Wedding style tag */}
          {product.weddingStyle && (
            <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${getStyleColor(product.weddingStyle)}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>{product.weddingStyle}</span>
            </div>
          )}
          
          {/* Season tag */}
          {product.season && (
            <div className="text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
              {product.season}
            </div>
          )}
          
          {/* Seller rating */}
          {product.seller?.rating && (
            <div className="flex items-center gap-1 ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-amber-400">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-neutral-600">{product.seller.rating}</span>
            </div>
          )}
        </div>

        {/* Story snippet if available */}
        {product.story && <p className="text-xs text-neutral-600 italic mb-2 line-clamp-2">"{product.story}"</p>}

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          
          
          {product.seller?.name && (
            <span className="text-xs text-neutral-500">by {product.seller.name}</span>
          )}
        </div>
      </div>

      {/* Decorative border that animates on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

      <a href={`/listings/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {product.title}</span>
      </a>
    </div>
  )
}
