import React from "react";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 my-2">
        {children}
      </div>
    </div>
  );
}
