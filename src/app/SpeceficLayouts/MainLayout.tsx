"use client";

import "../globals.css";
import Footer from "../../Components/MainComponents/Footer/Footer";
import Header from "../../Components/MainComponents/Header/Header";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
