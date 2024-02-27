import { Toaster } from "@/app/components/ui/toaster";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VK Traders",
  description: "By Cargo Van Crew!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
