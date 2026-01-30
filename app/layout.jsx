import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/FloatingChatBox.css";
import "./styles/Navbar.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sakay PH - Your Ride Hailing App",
  description: "Affordable and convenient transportation in Metro Manila",
  icons: {
    icon: "/sakay_logo.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
