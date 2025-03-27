import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface FeaturedCollectionProps {
  title: string;
  description: string;
  image: string;
}

export default function FeaturedCollection({ title, description, image }: FeaturedCollectionProps) {
  return (
    <Link
      href="#"
      className="group relative overflow-hidden rounded-lg aspect-[4/5] block shadow-soft hover:shadow-md transition-all duration-300"
    >
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border border-white/30 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border border-white/30 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>

      {/* Image with zoom effect */}
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-2xl font-serif text-white mb-2 transition-transform duration-300 group-hover:translate-y-[-4px]">
          {title}
        </h3>
        <p className="text-white/80 text-sm mb-4 transition-transform duration-300 group-hover:translate-y-[-2px]">
          {description}
        </p>
        <div className="flex items-center text-white text-sm font-medium">
          <span>Explore Collection</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>

      {/* Decorative border animation */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-lg transition-all duration-500 z-10"></div>
    </Link>
  )
}
