import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import MobileHeader from "./components/layout/MobileHeader";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bookmaker",
  description: "Le meilleur des livres d'occasion",
  keywords: "livres, occasion, lecture, bookmaker",
  openGraph: {
    title: "Bookmaker",
    description: "Le meilleur des livres d'occasion",
    images: ['/img/logo.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${roboto.variable} ${inter.variable} antialiased`}
      >
<MobileHeader/>
          {children}


      </body>
    </html>
  );
}
