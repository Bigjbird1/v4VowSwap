"use client";

import { useState } from "react";
import { Search, Heart, Menu, X } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Popover } from "@headlessui/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import SearchComponent from "../SearchComponent/SearchComponent";
import { fetchSearchResults } from "../../../app/listings/utils-listings";

interface HeaderProps {}

interface NavigationItem {
  name: string;
  href: string;
  current?: boolean;
}

export default function Header({}: HeaderProps) {
  const { isSignedIn } = useAuth();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  // Wedding-focused navigation
  const navigation: NavigationItem[] = [
    { name: "Wedding Shop", href: "/listings" },
    { name: "Collections", href: "#" },
    {
      name: isSignedIn ? "Sell Items" : "Sign up",
      href: isSignedIn ? "/create-listing" : "/sign-up",
    },
    { name: "Wedding Stories", href: "#" },
  ];

  const handleSearch = async (query: string): Promise<void> => {
    const results = await fetchSearchResults(query);
    setSearchResults(results);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-6 md:px-10 flex justify-between items-center shadow-soft border-b border-neutral-100">
      <div className="flex items-center gap-10">
        <Link href="/" className="text-2xl font-serif tracking-tight text-navy flex items-center">
          <span className="text-primary">Vow</span>Swap
          <span className="text-gold ml-1">♦</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          {navigation.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-neutral-600 hover:text-primary text-sm font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative">
          <SearchComponent
            onSearch={handleSearch}
            searchResults={searchResults}
          />
        </div>
        <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-primary transition-colors">
          <Heart className="h-5 w-5" />
        </Button>
        {isSignedIn ? (
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-2 text-sm font-medium border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-2 text-sm font-medium border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
        
        {/* Mobile menu */}
        <div className="md:hidden">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className="flex items-center text-neutral-600 hover:text-primary">
                  {open ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Popover.Button>
                
                <Popover.Panel className="absolute right-0 z-10 mt-2 w-screen max-w-xs transform px-4">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white p-6">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-primary/5 focus:outline-none"
                        >
                          <div className="text-sm font-medium text-neutral-900">
                            {item.name}
                          </div>
                        </a>
                      ))}
                      
                      {isSignedIn ? (
                        <a
                          href="/dashboard"
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-primary/5 focus:outline-none"
                        >
                          <div className="text-sm font-medium text-neutral-900">
                            Dashboard
                          </div>
                        </a>
                      ) : (
                        <a
                          href="/sign-in"
                          className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-primary/5 focus:outline-none"
                        >
                          <div className="text-sm font-medium text-neutral-900">
                            Sign In
                          </div>
                        </a>
                      )}
                    </div>
                  </div>
                </Popover.Panel>
              </>
            )}
          </Popover>
        </div>
      </div>
    </header>
  );
}
