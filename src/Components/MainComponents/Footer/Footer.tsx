import Link from "next/link";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

export default function Footer() {
  const mainNavigation = [
    { name: "About", href: "/about/" },
    { name: "Listings", href: "/listings/" },
    { name: "Sign up", href: "/sign-up/" },
    { name: "Terms", href: "/terms/" },
    { name: "Privacy Policy", href: "/privacy-policy/" },
  ];

  const shopLinks = [
    { name: "All Items", href: "/listings" },
    { name: "Dresses", href: "#" },
    { name: "Decor", href: "#" },
    { name: "Accessories", href: "#" },
  ];

  const aboutLinks = [
    { name: "Our Story", href: "/about" },
    { name: "Sustainability", href: "#" },
    { name: "Seller Guidelines", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <footer className="bg-navy text-white py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-serif text-xl mb-4 flex items-center">
            <span className="text-primary">Vow</span>Swap
            <span className="text-gold ml-1">♦</span>
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            Curating preloved items for conscious shoppers. Every piece has a story, ready to be part
            of yours.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {shopLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/70 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-4">About</h4>
          <ul className="space-y-2 text-sm">
            {aboutLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-white/70 hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-4">Stay Connected</h4>
          <p className="text-sm mb-4 text-white/80">
            Join our newsletter for curated collections and inspiration.
          </p>
          <div className="flex">
            <Input
              placeholder="Your email"
              className="rounded-r-none bg-navy/50 border-white/20 text-white focus-visible:ring-primary/20 focus-visible:border-primary/30"
            />
            <Button className="rounded-l-none bg-primary hover:bg-primary/90 text-navy">Subscribe</Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 text-sm text-center md:text-left md:flex justify-between items-center">
        <p className="text-white/70">&copy; 2025 VowSwap. All rights reserved.</p>
        <div className="mt-4 md:mt-0">
          <Link href="/privacy-policy" className="text-white/70 hover:text-primary transition-colors mr-6">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-white/70 hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
