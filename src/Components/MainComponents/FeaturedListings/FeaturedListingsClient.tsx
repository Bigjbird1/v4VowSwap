"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Filter, ChevronDown, Heart, Sparkles, Tag } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import ProductCard from "@/Components/MainComponents/ProductCard/ProductCard";

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  photos: { url: string }[];
  category?: string;
  condition?: string;
  weddingStyle?: string;
  season?: string;
  seller?: {
    name: string;
    rating?: number;
  };
  story?: string;
}

interface FeaturedListingsClientProps {
  data: Listing[];
}

export default function FeaturedListingsClient({
  data,
}: FeaturedListingsClientProps) {
  const [activeCategory, setActiveCategory] = useState("Dresses");
  
  // Wedding-specific categories
  const categories = ["Dresses", "Decor", "Accessories", "Flowers", "Shoes", "Stationery", "Gifts"];
  

  return (
    <section className="py-16 px-6 md:px-10 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif mb-2 text-navy">Wedding Treasures</h2>
            <p className="text-neutral-600">Pre-loved wedding items with exceptional quality and significant savings</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-sm border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-600">Sort by:</span>
              <Button
                variant="ghost"
                size="sm"
                className="font-medium flex items-center gap-1 hover:text-primary transition-colors"
              >
                Recommended
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Wedding Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant={category === activeCategory ? "default" : "outline"}
              className={`rounded-full px-4 py-2 whitespace-nowrap transition-all duration-300 cursor-pointer ${
                category === activeCategory
                  ? "bg-primary text-navy hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:text-primary hover:border-primary/30"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
        

        {/* Featured Wedding Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>


        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="px-8 py-6 rounded-full text-sm border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/40 transition-all"
          >
            <Link href="/listings" className="flex items-center">
              View All Wedding Items
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
